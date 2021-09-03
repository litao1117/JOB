/**
 * 原生js
 */

Array.prototype.myForEach = function(fn) {
    for(let item of this) {
        fn.call(this, item);
    }
}

let arr = [1,2,3];
arr.myForEach(item => {
    console.log(item);
})