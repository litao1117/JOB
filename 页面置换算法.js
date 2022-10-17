/**
 * LRU: 最近最少使用    
 */
class LRU {
    constructor(capacity) {
        this.cache = new Map();
        this.capacity = capacity;
    }

    put(key, value) {
        const {cache, capacity} = this;
        if (capacity === 0) return;
        if (cache[key]) {
            cache.delete(key);
        }
        if (cache.size === capacity) {
            const it = cache.keys();
            cache.delete(it.next().value);
        }
        cache.set(key, value);
    }

    get(key) {
        const {cache} = this;
        if (cache[key]) {
            const val = cache[key];
            cache.delete(key);
            cache.set(key, val);
            return val;
        } else {
            return -1;
        }
    }
}

/**
 * LFU: 最近最不常用
 */

class LFU {
    constructor(capacity) {
        this.capacity = capacity;
        this.values = new Map();
        this.times = new Map();  // 每个key出现的次数
        this.useMap = new Map(); // 保存 键为次数，值为set集合，该次数的所有key
        this.min = 0;
    }

    get(key) {
        if (this.values.has(key)) {
            this.updateCount(key);
            return this.values.get(key);
        }
        return -1;
    }

    put(key, val) {
        if (this.capacity === 0) return;
        if (this.values.has(key)) {
            this.values.set(key, val);
            this.updateCount(key);
        } else {
            if (this.capacity === this.values.size) {
                let minSet = this.useMap.get(this.min);
                let minKey = minSet.keys().next().value;
                minSet.delete(minKey);
                this.values.delete(minKey);
                this.times.delete(minKey);
            }
            this.values.set(key, val);
            let useSet = this.useMap.get(1) || new Set();
            useSet.add(key);
            this.useMap.set(1, useSet);
            this.times.set(key, 1);
            this.min = 1;
        }
    }

    updateCount(key) {
        let time = this.times.get(key);
        let useSet = this.useMap.get(time);
        if(time === this.min && useSet.size === 1) {
            this.min += 1;
        }
        time += 1;
        useSet.delete(key);
        useSet = this.useMap.get(time) || new Set();
        useSet.add(key);
        this.useMap.set(time, useSet);
        this.times.set(key, time);
    }
}