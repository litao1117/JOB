/**
 * 模拟settimeout
 */

function mySetTimeOut1(callback, time) {
  let begin = new Date().getTime()
  let timer = setInterval(() => {
    clearInterval(timer)
    let now = new Date().getTime()
    console.log((now - begin) / 1000)
    callback()
  }, time)
}

function mySetTimeOut2(callback, time) {
  let begin = new Date().getTime()
  return new Promise((resolve, reject) => {
    while (true) {
      let now = new Date().getTime()
      if (now - begin >= time) {
        return resolve(callback.call(this))
      }
    }
  })
}

// mySetTimeOut2(() => console.log('timeout'), 1000);

/**
 * 模拟setInterval
 */
function mySetInterval(callback, time, count) {
  function interval(callback, time) {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      callback()
      if (count > 1) {
        count--
        interval(callback, time)
      }
    }, time)
  }
  interval(callback, time)
}
mySetInterval(() => console.log("interval"), 1000, 5)
