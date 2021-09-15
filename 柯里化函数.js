/**
 * 柯里化
 */

function currying(fn, args) {
    let len = fn.length;
    let args1 = args || [];
    return function curried(arg) {
        // let args2 = Array.prototype.slice.call(arguments);
        Array.prototype.push.call(args1, arg);
        if(args1.length >= len) {
            return fn.apply(this, args1);
        } else {
            return function(args3) {
                return curried.call(this, args3);
            }
        }
    }
}


function curryIt(fn) {
    let args = []  
 
    return function curried(arg) {
        args.push(arg)      
        if (args.length >= fn.length) {
            return fn.apply(this, args)
        } else {
            return function(arg2) {  
                return curried.call(this, arg2)
            }
        }
    }
}

// var fn = function (a,b,c) { return a+b+c };
// console.log(currying(fn)(1)(4)(3));

let args = [];
function myCurry(a) {
    args.push(a);
    return function cur(arg) {
        if(arg) {
            args.push(arg);
            return function(arg2) {
                return cur.call(this, arg2);
            }
        } else {
            return args.reduce((a, b) => {
                return a+b;
            }, 0)
        }
    }
}


console.log(myCurry(1)(2)(3)(4)());