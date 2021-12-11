/**
 * const repeatFunc = repeat(console.log, 4, 3000)
 * repeatFunc("helloworld")//会输出四次helloworld，每次间隔3s
 */


function repeat(func, times, delay) {
  return async function(...args) {
    for(let i = 0; i < times; i++) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          func.apply(this, args);
          resolve()
        }, delay);
      })
    }
  }
}

// function repeat(func, times, delay) {
//   return async function(...args) {
//     for(let i = 0; i < times; i++) {
//       await setTimeout(() => {
//         func.apply(this, args);
//       },delay)
//     }
//   }
// }


const repeatFunc = repeat(console.log, 4, 1000)
repeatFunc("helloworld")
