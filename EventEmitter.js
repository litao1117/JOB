/**
 * 手写node中的EventEmitter
 */

class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    // 监听事件，不执行
    on(name, cb) {
        const query = this.events[name] || [];
        query.push(cb);
        this.events[name] = query;
        return this;
    }

    // 取消事件
    remove(name, cb) {
        const query = this.events[name];
        if (!cb) {
            delete this.events[name];
            return this;
        }
        this.events[name] = query && query.filter(fn => fn !== cb);  
        return this;
    }

    // 触发事件并执行
    emit(...args) {
        const query = this.events[args[0]];
        if(!query) return false;
        const params = args.slice(1);
        query.forEach(fn => {
            fn.apply(this, params);
        })
        return true;
    }

    // 单次触发事件
    once(name, cb) {
        // 封装一个单次执行函数
        const wrap = (...args) => {
            cb.apply(this, args);
            this.remove(name, wrap);
        }
        this.on(name, wrap);
        return this;
    }
}

