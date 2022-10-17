/**
 * 柯里化
 */

function currying(fn, ...args) {
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

// var fn =  function (a,b,c) { return a+b+c };
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


// console.log(myCurry(1)(2)(3)(4)());


function curry(fn, len = fn.length, ...args) {
    return function(...params) {
        let _args = [...args, ...params]
        if (_args.length >= len) {
            return fn.apply(this, _args);
        }
        else {
            return curry.call(this, fn, len, ..._args)
        }
    }
}

// console.log(curry(fn, 3, 1)(2, 3));

// lodash 带有占位符的curry
function _curry(fn, len, holder, args, holders) {
    return function(..._args) {
        // 将参数复制一份，避免多次操作同一函数导致参数混乱
        let params = args.slice();
        // 将占位符位置列表复制一份，新增加的占位符添加进去
        let _holders = holders.slice()
        // 循环入参，追加参数 或 替换占位符
        _args.forEach((arg, i) => {
            // 真实参数之前存在占位符，将占位符替换为真实参数
            if (arg !== holder && holders.length) {
                let index = holders.shift();
                _holders.splice(_holders.indexOf(index), 1);
                params[index] = arg;
            }
            // 真实参数之前不存在占位符，将参数添加到参数列表
            else if (arg !== holder && !holders.length) {
                params.push(arg);
            }
            // 传入的是占位符，之前不存在占位符，记录占位符的位置
            else if (arg === holder && !holders.length) {
                params.push(arg);
                _holders.push(params.length - 1);
            }
            // 传入的是占位符，之前存在，删除原占位符位置
            else if (arg === holder && holders.length) {
                holders.shift();
            }
        });
        // params 中前len条记录中不包含占位符，执行函数
        if (params.length >= len && params.slice(0, len).indexOf(holder) === -1) {
            return fn.apply(this, params)
        } else {
            return _curry.call(this, fn, len, holder, params, _holders)
        }
    }
}

// let fn = function(a, b, c, d, e) {
//     console.log([a, b, c, d, e]);
// }

// let _ = {}; // 定义占位符
// let _fn = _curry(fn,5,_,[], []);  // 将函数柯里化，指定所需的参数个数，指定所需的占位符

// _fn(1, 2, 3, 4, 5);                 // print: 1,2,3,4,5
// _fn(_, 2, 3, 4, 5)(1);              // print: 1,2,3,4,5
// _fn(1, _, 3, 4, 5)(2);              // print: 1,2,3,4,5
// _fn(1, _, 3)(_, 4,_)(2)(5);         // print: 1,2,3,4,5
// _fn(1, _, _, 4)(_, 3)(2)(5);        // print: 1,2,3,4,5
// _fn(_, 2)(_, _, 4)(1)(3)(5);        // print: 1,2,3,4,5

// redux compose 函数
function compose(...funcs) {
    if (funcs.length === 0) return;
    if (funcs.length === 1) return funcs[0];
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

// function sum(num) {
//     return num+2
// }
// function add(num) {
//     return num+3
// }

// console.log(compose(sum, add)(1));

// 不定参数无限累加，调用sumOf
function sum(...params) {
    let args = params;
    function sum1() {
        args = [...args, ...arguments];
        return sum1
    }
    sum1.sumOf = function() {
        return args.reduce((a, b) => a + b)
    }
    return sum1
}

console.log( sum(1, 2)(3, 4)(5).sumOf());