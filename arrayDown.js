// 数组降维
const flattenDeep = (arr) => Array.isArray(arr) 
    ? arr.reduce((a, b) => [...a, ...flattenDeep(b)], [])
    : [arr];
console.log(flattenDeep([1,[2,[3, [4]]], [5]]));


const flat = (arr) => Array.isArray(arr)
? arr.reduce((a, b) => [...a, ...flat(b)], [])
: [arr];


flatDeep = function(arr) {
    if(Array.isArray(arr)) {
        return arr.reduce(function(a, b){
            return [...a, ...flatDeep(b)]
        }, []);
    } else {
        return [arr];
    }
}

const log = flatDeep([1,2,[3,4,5,[6,7]]]);
console.log(log);