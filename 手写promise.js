/**
 * 手写一个promise
 */

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise{
    constructor(executer) {
        // 错误捕获要改变状态为reject
        try {
            executer(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
        
    }

    // 储存状态
    status = PENDING;
    // 成功之后的值
    value = null;
    // 失败之后的值
    reason = null;
    // 成功之后的回调函数
    onFulfilledCallback = [];
    // 失败之后的回调函数
    onRejectedCallback = [];
    // 更改成功之后的状态
    resolve = (value) => {
        if(this.status === PENDING) {
            this.status = FULFILLED;
            this.value = value;
            while(this.onFulfilledCallback.length) {
                this.onFulfilledCallback.shift()(value);
            }
        }
    }
    // 更改失败之后的状态
    reject = (reason) => {
        if(this.status === PENDING) {
            this.status = REJECTED;
            this.reason = reason;
            while(this.onRejectedCallback.length) {
                this.onRejectedCallback.shift()(reason);
            }
        }
    }
    // then
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
        // 为了链式调用这里创建一个promise，并在后面return出去
        const promise2 = new MyPromise((resolve, reject) => {
            if(this.status === FULFILLED) {
                // 这里需要创建一个微任务等待promise2完成初始化，否则下面的函数传入promise2会报错
                queueMicrotask(() => {
                    try {
                        // 获取成功回调函数的执行结果
                        const x = onFulfilled(this.value);
                        // 传入resolvePromise集中处理
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            } else if(this.status === REJECTED) {
                // 这里需要创建一个微任务等待promise2完成初始化，否则下面的函数传入promise2会报错
                queueMicrotask(() => {
                    try {
                        // 获取失败回调函数的执行结果
                        const x = onRejected(this.reason);
                        // 传入resolvePromise集中处理
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            } else if(this.status === PENDING) {
                queueMicrotask(() => {
                    try {
                        const x1 = onFulfilled(this.value);
                        const x2 = onRejected(this.reason);
                        this.onFulfilledCallback.push(resolvePromise(promise2, x1, resolve, reject));
                        this.onRejectedCallback.push(resolvePromise(promise2, x2, resolve, reject));
                    } catch (error) {
                        reject(error)
                    }
                })
            }
        }) 
        return promise2; 
    }
}
function resolvePromise(promise2, x, resolve, reject) {
    // 如果相等了，说明return的是自己，抛出类型错误并返回
    if(promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    // 判断x是不是MyPromise实例对象
    if(x instanceof MyPromise) {
        // 执行x，调用then方法，目的是将其状态变为fulfilled或者rejected
        // x.then(value => resolve(value), reason => reject(reason));
        // 简化后
        x.then(resolve, reject);
    } else {
        // 普通值
        resolve(x);
    }
}

const promise = new MyPromise((resolve, reject) => {
        resolve("success");
        // throw new Error("执行器错误")
})

const p1 = promise.then((value) => {
    console.log(1);
    console.log('resolve', value);
    throw new Error("then error")
    // return p1;
}, reason => {
    console.log(2);
    console.log(reason.message);
})
p1.then(value => {
    console.log(3);
    console.log('resolve', value);
}, reason => {
    console.log(4);
    console.log(reason.message);
})





/**
 * 使用promise进行顺序（sequence）处理
 */
function sequenceTasks(tasks) {
    function recordValue(results, value) {
        results.push(value);
        return results;
    }
    var pushValue = recordValue.bind(null, []);
    return tasks.reduce(function(promise, task) {
        return promise.then(() => task).then(pushValue);
    }, Promise.resolve());
}
// sequenceTasks([1,2,3]).then((res) => console.log(res))
// console.log();

// let p2 = Promise.resolve();
// p2.then(()=>"123").then((value) => {
//     console.log(value);
// })


/**
 * done方法，不会出现错误的catch
 */
function done() {
    this.catch((reason) => {
        console.log('done',reason);
        throw reason;
    })
}