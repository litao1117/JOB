/**
 * 原生js实现forEach
 */

Array.prototype.myForEach = function(fn) {
    for(let item of this) {
        fn.call(this, item);
    }
}

let arr = new Array(5);
arr[0] = 0;
arr[2] = 2;
arr[3] = 0;
// arr.myForEach(item => {
//     console.log(item);
// })

/**
 * 实现map
 */

Array.prototype.myMap = function(fn) {
    if(typeof fn !== 'function') {
        throw new TypeError(fn + 'is not a function');
    }
    const arr = this;
    const len = arr.length;
    const newArr = new Array(len);
    for(let i = 0; i < len; i++) {
        // 获取第二个参数改变this指向
        let result = fn.call(arguments[1], arr[i], i, arr);
        newArr[i] = result;
    }
    return newArr;
}

/**
 * 实现filter
 */

Array.prototype.myFilter = function(fn) { 
    if(typeof fn !== 'function') {
        throw new TypeError(fn + 'is not a function');
    }
    const arr = this;
    const len = arr.length;
    const newArr = new Array();
    for(let i = 0; i < len; i++) {
        let result = fn.call(arguments[1], arr[i], i, arr);
        result && newArr.push(arr[i]);
    }
    return newArr;
}

/**
 * 实现reduce
 */

Array.prototype.myReduce = function(fn) {
    if(typeof fn !== 'function') {
        throw new TypeError(fn + 'is not a function');
    }
    const arr = this;
    const len = arr.length;
    let value;  // 最后返回的值
    let k = 0;  // 当前索引
    if(arguments.length >= 2) {
        value = arguments[1];
    } else {
        // 当数组为稀疏数组时，判断当前索引是否有元素
        while(k < len && !(k in arr)) {
            k++;
        }
        if(k >= len) {
            throw new Error('');
        }
        value = arr[k++]
    }
    while(k < len) {
        if(k in arr) {
            value = fn(value, arr[k], k, arr);
        }
        k++;
    }
    return value;
}

Array.prototype.myReduce2 = function(fn, ...args) {
    if(typeof fn !== 'function') {
        throw new TypeError(fn + 'is not a function');
    }
    let start = 0, pre;
    if(args.length) {
        pre = args[0];
    } else {
        pre = this[0];
        start = 1;
    }
    for(let i = start; i < this.length; i++) {
        pre = fn(pre, this[i], i, this);
    }
    return pre;
}