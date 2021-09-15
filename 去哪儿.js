// var readline = require('readline');

// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// let curline = 0;
// let str1, str2;
// rl.on('line', (line) => {
//     str1 = line.substring(11, line.length-1).split(', ').map(Number);
//     // let curriedSum = curry(sum);
//     // console.log(curriedSum(str1[0])(str1[1])(str1[2]));
//     let sum = 0;
//     str1.forEach((item) => {
//       sum += item;
//     })
//     console.log(sum);
//     rl.close()
// })



function add(str1, str2) {
  let arr1 = str1.split('').map(Number);
  let arr2 = str2.split('').map(Number);
  let res = [];
  if(arr1.length != arr2.length) {
    if(arr1.length > arr2.length) {
      let temp = new Array(arr1.length-arr2.length).fill(0);
      arr2.unshift(...temp);
    } else {
      let temp = new Array(arr2.length-arr1.length).fill(0);
      arr1.unshift(...temp);
    }
  }
  console.log(arr1,arr2);
  let pri = 0;
  for(let i = arr1.length-1; i >= 0; i--) {
    res[i] = (arr1[i]+arr2[i])%10+pri;
    pri = parseInt((arr1[i]+arr2[i]+pri)/10);
  }
  if(pri!=0) {
    res.unshift(pri);
  }
  return res.join('');
}

function sum(num1, num2, num3) {
  return num1 + num2 + num3;
}
function curry(fn) {
  let args = [...arguments].slice(1);
  let len = fn.length;
  return function curried(arg) {
    Array.prototype.push.call(args, arg);
    if(args.length === len) {
      return fn.apply(this, args);
    } else {
      return function(arg2) {
        return curried.call(this, arg2);
      }
    }
  }
}
let curriedSum = curry(sum);
// console.log(curriedSum(2)(3)(4));

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', (line) => {
    let arr = line.split('.');
    let data = arr[0].split('(')[1].substring(-2);
    console.log(arr, data);
    arr.splice(0, 1);
    arr[arr.length-1] = arr[arr.length-1].substring(-2);
    let path = arr;
    console.log(dataProxy(data, path));
})


function dataProxy(data, path = []) {
    /* Write Code Here */
    return path.reduce((obj, pa) => {
        return (obj && obj[pa]) ? obj[pa] : undefined
    }, data)
}