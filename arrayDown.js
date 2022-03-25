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
[1, 2, [3, 4, 5, [6, 7]]].flatten();
// console.log(res);
