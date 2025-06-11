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

/**
 * 实现 add(1)(2)(3)(4)(5).sum()和 add(1)(2, 3)(4)(5).sum()参数不定的累加效果
 */
function add(...args) {
  let sum = 0
  function fn(...args) {
    sum += args.reduce((pre, cur) => pre + cur, 0)
    return fn
  }
  fn.sum = function () {
    return sum
  }
  return fn(...args)
}

function add2(...args) {
  let foo = (...argsments) => {
    return add2(...args, ...argsments)
  }
  foo.sum = () => {
    return args.reduce((pre, cur) => pre + cur, 0)
  }
  return foo
}

// let res = add2(1)(2, 3)(4)(5).sum()
// console.log(res)

let a = {
  n: 1,
}
let b = a
// a = {
//   n: 2,
// }
a.n = 3
console.log(a.x) // undefined
console.log(b) // {n: 1, x: {n: 2}}
