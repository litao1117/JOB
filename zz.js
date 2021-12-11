function curring(fn) {
    const args = [];
    return function curried(args1) {
        Array.prototype.push.call(args, args1);
        if(args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(args2) {
                return curried.call(this, args2);
            }
        }
    }
}
function debounce(fn, time, immediate) {
    let timer;
    return function(...args) {
        if(!timer && immediate) {
            fn.apply(this, args);
        }
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, time)
    }
}
function throttle(fn, time) {
    let can = true;
    return function(...args) {
        if(can) {
            can = false;
            setTimeout(() => {
                fn.apply(this, args);
                can = true;
            }, time);
        } else {
            return;
        }
    }
}

Function.prototype.myCall = function(context) {
    context = context || window;
    context.fn = this;
    const args = [...arguments].slice(1);
    const result = context.fn(...args);
    delete context.fn;
    return result;
}
Function.prototype.myApply = function(context) {
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
Function.prototype.myBind = function(context) {
    const _this = this;
    const args = [...arguments].slice(1);
    return function F() {
        if(this instanceof F) {
            return new _this(...args, ...arguments);
        } 
        return _this.apply(context, args.concat(...arguments))
    }
}

