var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});
// var n = -1;// 初始状态为负数，表示还没开始读取
// var ans = 0;
// var big = 0;
// var cur_line = 0;
// var oriArr = [];
// rl.on('line', (line) => {
//     if(n < 0) {
//         const one = line.split(' ').map(Number);
//         n = one[0];
//         big = one[1];
//     } else {
//         const arr = line.split(' ').map(Number);
//         oriArr.push(arr);
//         cur_line++;
//     }
//     if(n === cur_line) {
//         for(let i = 0; i < oriArr.length; i++) {
//           for(let j = 0; j < big; j++) {
//             console.log(toBig(oriArr[i], big).toString().replace(/,/g, ' '))
//           } 
//         }
//        rl.close();
//     }
// })


// function toBig(arr, k) {
//     const res = [];
//     for(let i = 0; i < arr.length; i++) {
//         for(let j = 0; j < k; j++) {
//             res.push(arr[i]);
//         }
//     }
//     return res;
// }
// // console.log([2,3,4].toString());

// var n = -1;// 初始状态为负数，表示还没开始读取
// var ans = [];
// var cnt = 0;
// var cur_line = 0;
// var arr = [];
// rl.on('line', (line) => {
//     if(n < 0) {
//       n = parseInt(line.trim());
//     } else {
//       let num = parseInt(line.trim());
//       let cnt = 0;
//       let right = num;
//       let i = 1;
//       while(i < right) {
//         if(num % i === 0) {
//           j = num / i;
//           if(GCD(i, j) === 1) {
//             cnt++;
//           }
//           right = num / i;  
//         }
//         i++;
//       }
//       ans.push(cnt);
//       cur_line++;
//     }
//     if(n === cur_line) {
//       ans.forEach((item) => {
//         console.log(item);
//       })      
//       rl.close();
//     }
// })

// // 最大公约数  
// function GCD(a, b) {
//   let max = Math.max(a, b);
//   let min = Math.min(a, b);
//   let c = max % min;
//   if(c === 0) return min;
//   return GCD(min, c);
// }
// // 最小公倍数
// function LCM(a, b) {
//   return (a*b)/GCD(a, b);
// }

// console.log(GCD(1, 3));
// console.log(LCM(2, 30));

var ans = [];
var n = -1;// 初始状态为负数，表示还没开始读取
var cur_line = 0;
rl.on('line', (line) => {
    if(n < 0) {
      n = parseInt(line.trim());
    } else {
      let num = parseInt(line.trim());
      if(isPerfectNum(num)) ans.push(num);
      else ans.push(perfectNum(num));
      cur_line++;
    }
    if(n === cur_line) {
      ans.forEach((item) => {
        console.log(item);
      })     
      rl.close();
    }
})

function isPerfectNum(num) {
  return /^[1,2,3]+$/.test(String(num));
}

function perfectNum(num) {
  for(let i = num; i >= 1; i--) {
    if(i < num && isPerfectNum(i)) {
      return i;
    } 
  }
}






