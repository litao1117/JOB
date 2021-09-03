/**
 * 防抖，节流实现
 * 防抖：对于短时间连续触发的事件，在某个时间期限内，事件处理函数只执行一次
 * 节流：短时间内大量触发同一事件，那么在函数执行一次后，该函数在指定时间期限内不再工作，直到过了这段时间才重新生效
 * 
 */

// 防抖 
function debounce(func, ms = 1000) {
    let timer;
    return function(...args) {
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, ms)
    }
}


// 节流
function throttle(func, ms = 1000) {
    let canRun = true;
    return function(...args) {
        if(!canRun) return;
        canRun = false
        setTimeout(() => {
            func.apply(this, args);
            canRun = true
        }, ms)
    }
}

// 测试
const task = () => {
    console.log('run task');
}
const debounceTask = debounce(task, 1000)
window.addEventListener("scroll", debounceTask);