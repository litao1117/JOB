function delayAdd(a, b, callback) {
  setTimeout(() => {
    callback(a + b)
  }, 1000)
}

// 利用 delayAdd 实现一个延迟1s加法函数
async function asyncAdd(...args) {
  // todo
  let res = 0
  for (let i = 0; i < args.length; i++) {
    res = await new Promise((resolve, reject) => {
      delayAdd(args[i], res, resolve)
    })
  }
  return res
}

asyncAdd(1, 2, 3).then((res) => console.log(res))
