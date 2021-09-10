// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// let inputArr = '';
// rl.on('line', (line) => {
//   inputArr = line;
//   inputArr = inputArr.split(' ');
//   const output = inputArr.map(Number);
//   const len = output.length;
//   for(let end = len - 1; end > 0; end--) {
//     for(let i = 0; i < end; i++) {
//       if(output[i] > output[i+1]) {
//         let temp = output[i];
//         output[i] = output[i+1];
//         output[i+1] = temp;
//       }
//     }
//   }
//   console.log(output);
// })

// rl.on('close', () => {

// })








// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })
// const map = {
//   I: 1,
//   V: 5,
//   X: 10,
//   L: 50,
//   C: 100,
//   D: 500,
//   M: 1000
// };
// rl.on('line', (line) => {
//   let res = 0;
//   for(let i = 0; i < line.length; i++) {
//     const value = map[line[i]];
//     if(i < line.length - 1 && value < map[line[i + 1]]) {
//       res -= value;
//     } else {
//       res += value;
//     }
//   }
//   console.log(res);
// })

// rl.on('close', () => {

// })



const arr = read_line();
const arr1 = arr.split(' ');
arr1.map(Number);
arr1.sort();
console.log(arr1);