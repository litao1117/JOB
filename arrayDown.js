// 数组降维
const flattenDeep = (arr) =>
    Array.isArray(arr)
        ? arr.reduce((a, b) => [...a, ...flattenDeep(b)], [])
        : [arr];
// console.log(flattenDeep([1,[2,[3, [4]]], [5]]));

// const flat = (arr) => Array.isArray(arr)
// ? arr.reduce((a, b) => [...a, ...flat(b)], [])
// : [arr];

// flatDeep = function(arr) {
//     if(Array.isArray(arr)) {
//         return arr.reduce(function(a, b){
//             return [...a, ...flatDeep(b)]
//         }, []);
//     } else {
//         return [arr];
//     }
// }

// const log = flatDeep([1,2,[3,4,5,[6,7]]]);
// console.log(log);

// 多层拍平数组
function flatArray(arr, num = 1) {
    if (!Number(num) || Number(num) < 0) {
        return arr;
    }
    let newArr = [];
    arr.forEach((item) => {
        if (Array.isArray(item)) {
            newArr = newArr.concat(flatArray(item, --num));
        } else {
            newArr.push(item);
        }
    })
    return newArr;
}

Array.prototype.flatten = function() {
    let arr = this;
    let newArr = arr.reduce(function (a, b) {
        if (Array.isArray(b)) {
            return a.concat(b.flatten());
        } else {
            return a.concat([b]);
        }
    }, []);
    return newArr;
};
// console.log([1, 2, [3, 4, 5, [6, 7]]].flatten());


Array.prototype.flat1 = function(deep = 1) {
    const flatDeep = function(arr, deep) {
        return deep > 0 ? arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatDeep(b, deep - 1) : b), []) : arr.slice()
    }
    return flatDeep(this, deep)
}
// console.log([1, 2, [3, 4, 5, [6, 7]]].flat1(1));

Array.prototype.flat2 = function(deep = 1) {
    const res = [];
    (function flat(arr, deep) {
        arr.forEach(item => {
            if (Array.isArray(item) && deep > 0) {
                flat(item, deep - 1);
            } else {
                res.push(item)
            }
        })
    })(this, deep)
    return res;
}
console.log([1, 2, [3, 4, 5, [6, 7]]].flat2(2));