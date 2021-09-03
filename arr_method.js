/**
 * 数组方法
 */

/**
 * forEach
 */

Array.prototype.myForEach = function(fn) {
    if(typeof fn !== 'function') {
        throw new TypeError(`${fn} is not a function`);
    }
    let arr = this;
    let len = arr.length;
    for(let i = 0; i < len; i++) {
        fn.call(this, arr[i]);
    }
}
// let arr = [1,2,3];
// arr.myForEach(item => console.log(item));

/**
 * map
 */

Array.prototype.myMap = function(fn) {
    if(typeof fn !== 'function') {
        throw new TypeError(`${fn} is not a function`);
    }
    let arr = this;
    let len = arr.length;
    let temp = new Array(len);
    console.log(arguments[1]);
    for(let i = 0; i < len; i++) {
        let result = fn.call(arguments[1], arr[i], i, arr);
        temp[i] = result;
    }
    return temp;
}
let arr = [1,2,3];
const newArr = arr.myMap(value => value * 3);
console.log(newArr);



/**
 * filter
 */

Array.prototype.myFilter = function(fn) {
    if(typeof fn !== 'function') {
        throw new TypeError(`${fn} is not a function`);
    }
    let arr = this;
    let len = arr.length;
    let temp = new Array(len);
    for(let i = 0; i < len; i++) {
        let result = fn.call(arguments[1], arr[i], i, arr);
        result && temp.push(arr[i]);
    }
    return temp;
}

/**
 * reduce
 */

Array.prototype.myReduce = function(fn) {
    if(typeof fn !== 'function') {
        throw new TypeError(`${fn} is not a function`);
    }
    let arr = this;
    let len = arr.length;
    let value;  // 最终返回的值
    let k = 0;  // 当前索引
    if(arguments.length >= 2) {
        value = arguments[1];
    } else {
        // 当数组为稀疏数组是，判断数组当前是否有元素，如果没有索引加1
        while(k < len && !(k in arr)) {
            k++;
        }
        // 如果数组为空且初始值不存在则报错
        if(k >= len) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        value = arr[k++];
    }
    while(k < len) {
        if(k in arr) {
            value = fn(value, arr[k], k, arr);
        }
        k++;
    }
    return value;
}