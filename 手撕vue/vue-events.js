/**
 * 事件相关的实例方法
 */

// vm.$on  监听当前实例上的自定义事件，事件可以由vm.$emit触发，回调函数会接收所有传入事件所触发的函数的额外参数
Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if(Array.isArray(event)) {
        for(var i = 0, l = event.length; i < l; i++) {
            vm.$on(event[i], fn);
        }
    } else {
        (vm._events[event] || (vm._events[event] = [])).push(fn);
    }
    return vm;
}
/*  当event为数组的时候，需要遍历数组，使得数组中的每一项都调用vm.$on,使回调可以注册到数组中每项事件名所指定的事件列表中，
    当event参数不为数组时，就像事件列表中添加回调。vm._events是一个对象，用来存储事件，
    使用事件名（event）从vm._events中取出事件列表，如果列表不存在，则使用空数组初始化，
    然后将回调函数添加到事件列表中。
*/

// vm.$emit 触发当前实例上的事件，附加参数都会传给监听器回调
Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if(cbs) {
        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
        var args = toArray(arguments, 1);
        for(var i = 0, l = cbs.length; i < l; i++) {
            try {
                cbs[i].apply(vm, args);
            } catch (error) {
                handleError(e,vm,`event handler for "${event}"`);
            }
        }
    }
    return vm;
}


// vm.$off   移除自定义事件监听器
// 如果没有提供参数，则移除所有的事件监听器；
// 如果只提供了事件，则移除该事件所有的监听器；
// 如果同时提供了事件与回调，则只移除这个回调的监听器。
Vue.prototype.$off = function(event, fn) {
    const vm = this;
    // 没有提供参数
    if(!arguments.length) {
        // 移除所有事件监听器，重置vm._events属性
        vm._events = Object.create(null);
        return vm;
    }
    // vm.$off的第一个参数支持数组，当event为数组的时候，只需要将数组遍历一遍，然后数组中的每一项依次调用vm.$off;
    if(Array.isArray(event)) {
        for(let i = 0 ; i<event.length; i++){
            vm.$off(event[i],fn);
        }
        return vm;
    }
    // 只提供了事件名，移除该事件的所有监听器
    const cbs = vm._events[event];
    if(!cbs) {
        return vm;
    }
    // 这里做了一个安全检测，如果这个事件没有被监听，vm._events内找不到任何监听器，直接退出
    // 程序，然后判断是否只有一个参数，如果是，将事件名在vm._events中所有事件都移除，只需要
    // 将vm._events上以该事件为属性的值设置为null即可
    if(arguments.length === 1) {
        vm._events[event] = null;
        return vm;
    }
    // 3、如果同时提供了事件与回调，那么只移除这个回调的监听器，将使用参数中提供的事件名从
    // vm._events取出事件列表，然后从列表中找到与参数中提供的回调函数相同的那个函数，并
    // 将它从列表中移除
    if(fn) {
        // 先判断是否有fn参数，有则说明用户同时提供了event和fn两个参数，然后从vm._events
        // 中取出事件监听器列表并遍历它，如果列表中的某一项与fn相同，或者某一项的fn属性与fn相同，
        // 使用splice方法将它从列表中移除，当循环结束后，列表中所有与用户参数中提供的fn相同的监听器
        // 都会被移除
        const cbs = vm._events[event];
        let cb;
        let i = cbs.length;
        while(i--) {
            // 这里有一个细节要注意，在代码中遍历列表是从后向前循环，这样在列表中移除当前
            // 位置的监听器，不会影响列表中未遍历到的监听器位置，如果是从前向后遍历，那么当从
            // 列表中移除一个监听器时，后面的监听器会自动向前移动一个位置，会导致下一轮循环
            // 时跳过一个元素。
            cb = cbs[i];
            if(cb === fn || cb.fn === fn) {
                cb.splice(i, 1);
                break;
            }
        }
    }
    return vm;
}

// vm.$once   监听一个自定义事件，但是只触发一次，一旦触发，监听器就会被移除
Vue.prototype.$once = function(event, fn) {
    var vm = this;
    function on() {
        vm.$off(event, on);
        fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
} 

