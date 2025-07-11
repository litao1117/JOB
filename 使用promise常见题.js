/**
 * 使用promise实现每隔1秒输出1，2，3
 */

// const arr = [1,2,3];
// arr.reduce((p, x) => {
//     return p.then(() => {
//         return new Promise(resolve => {
//             setTimeout(() => resolve(console.log(x)), 1000)
//         })
//     })
// }, Promise.resolve())

/**
 * 使用promise实现红绿灯交替重复亮
 * 红灯3秒亮一次，黄灯2秒，绿的1秒
 */
function red() {
  console.log("red")
}
function green() {
  console.log("green")
}
function yellow() {
  console.log("yellow")
}
const light = function (timer, cb) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb()
      resolve()
    }, timer)
  })
}
const step = function () {
  Promise.resolve()
    .then(() => {
      return light(3000, red)
    })
    .then(() => {
      return light(2000, yellow)
    })
    .then(() => {
      return light(1000, green)
    })
    .then(() => {
      return step()
    })
}
// step();

/**
 *  实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中
 * 与promise.all类似，不过promise.all不需要管执行顺序
 */

function mergePromise(ajaxArray) {
  // 存放每个ajax的结果
  const data = []
  let promise = Promise.resolve()
  ajaxArray.forEach((ajax) => {
    // 第一次的then为了用来调用ajax
    // 第二次的then是为了获取ajax的结果
    promise = promise.then(ajax).then((res) => {
      data.push(res)
      return data // 把每次的结果返回
    })
  })
  // 最后得到的promise的值就是data
  return promise
}

// 传统异步函数 promisify
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      args.push(function (err, ...values) {
        if (err) {
          reject(err)
        }
        resolve(values)
      })
      Reflect.apply(fn, this, args)
    })
  }
}

// 并行的promise调度器
class Scheduler {
  constructor(limit) {
    this.queue = []
    this.maxCounts = limit
    this.runCounts = 0
  }
  add(time, n) {
    const promiseCreator = () => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          console.log(n)
          res()
        }, time)
      })
    }
    this.queue.push(promiseCreator)
  }
  start() {
    for (let i = 0; i < this.maxCounts; i++) {
      this.request()
    }
  }
  request() {
    if (!this.queue || !this.queue.length || this.runCounts == this.maxCounts) {
      return
    }
    this.runCounts++
    this.queue
      .shift()()
      .then(() => {
        this.runCounts--
        this.request()
      })
  }
}
// let s = new Scheduler(2);
// s.add(1000, 3);
// s.add(300, 1);
// s.add(500, 2);
// s.add(600, 4);
// s.start();

// promise类，同时只能发出5个请求
class PromisePool {
  constructor(limit) {
    this.limit = limit
    this.queue = []
    this.runCounts = 0
  }
  add(promiseFetch) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        promiseFetch,
        resolve,
        reject,
      })
      this.request()
    })
  }

  request() {
    while (this.runCounts < this.limit && this.queue.length) {
      const { promiseFetch, resolve, reject } = this.queue.shift()
      this.runCounts++
      promiseFetch
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(() => {
          this.runCounts--
          this.request()
        })
    }
  }
}
