/**
 * 手写call、apply、bind函数
 */

/**
 * 实现call
 * 首先context为可选参数，如果不传的话默认上下文为window
 * 接下来给context创建一个fn属性，并将值设置为需要调用的函数
 * 因为call可以传入多个参数作为调用函数的参数，所以需要将参数剥离出来
 * 然后调用函数并将对象上的函数删除
 */
Function.prototype.myCall = function(context) {
    if(typeof this !== 'function') {
        throw new TypeError('Error');
    }
    context = context || window;
    context.fn = this;
    const args = [...arguments].slice(1);
    const result = context.fn(...args);
    delete context.fn;
    return result;
}

/**
 * apply实现
 * 与call类似，区别在于参数的处理
 */
Function.prototype.myApply = function(context) {
    if(typeof this !== 'function') {
        throw new TypeError('Error');
    }
    context = context || window;
    context.fn = this;
    let result;
    if(arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }
    delete context.fn;
    return result;
}

/**
 * bind实现
 * bind返回了一个函数，对于函数来说有两种方式调用，一种是直接调用，一种是通过new的方式
 * 对于直接调用来说，这里选择了apply的方式实现，但是对于参数需要注意以下情况：因为bind可以实现类似
 * 这样的代码f.bind(obj,1)(2),所以需要将两边的参数拼接起来，于是就有了这样的实现args.concat(...arguments)
 * 最后来说通过new的方式，在之前的章节中我们学习过如何判断this，对于new的情况来说，不会被任何方式改变this
 * 所以这种情况我们需要忽略传入的this
 */
Function.prototype.myBind = function(context) {
    if(typeof this !== 'function') {
        throw new TypeError('Error');
    }
    const _this = this;
    const args = [...arguments].slice(1);
    //返回一个函数
    return function F() {
        // 因为返回了一个函数，我们可以new F()，所以需要判断
        if(this instanceof F) {
            return new _this(...args, ...arguments);
        }
        return _this.apply(context, args.concat(...arguments));
    }
}


function test(context) {
    if(typeof this !== 'function') throw new TypeError('');
    
}

