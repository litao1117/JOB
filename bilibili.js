// var readline = require('readline');
// process.stdin.setEncoding('utf-8');

// var rl = readline.createInterface({input: process.stdin, output: process.stdout, prompt:''});

// let arr = [];
// let k = 0;
// let curline = 0;
// rl.on('line', (line) => {
//   if(curline === 0) {
//     arr = line.substring(1, line.length-1).split(',').map(Number);
//     arr.sort((a, b) => a - b);
//     curline++;
//   } else {
//     k = Number(line);
//     let map = a(arr);
//     map.sort((a, b) => {
//       return b[1] - a[1];
//     })
    
//     if(map.length < k) {
//       console.log(-1);
//     } else {
//       console.log(Number(map[k-1][0]),map[k-1][1]);
//     }
//     rl.close()
//   }
// })


// function a(arr) {
//   let map = {};
//   for(let i = 0; i < arr.length;) {
//     let j = arr.lastIndexOf(arr[i]);
//     map[arr[i]] = j - arr.indexOf(arr[i]) + 1;
//     arr.splice(0, map[arr[i]]);
//   }
//   return Object.entries(map);
// }


// let str = '';
// let opra = [];
// rl.on('line', (line) => {
//   if(curline === 0) {
//     str = line;
//     curline++;
//   } else {
//     opra = line.split(' ');
//     console.log(timeTo(str, opra));
//     rl.close();
//   }
// })


// let map = {
//   'h': 0,
//   'm': 1,
//   's': 2,
// }
// function timeTo(timestr, opra) {
//   let arr = timestr.split(' ');
//   let date = arr[0].split('-').map(Number);
//   let time = arr[1].split(':').map(Number);
//   opra.forEach(item => {
    
//       if(item[2] === 'W') {
//         let n = 7*Number(item[1]);

//       } else if(item[2] === 'd'){
//         item[0] === '+' ? date[2] += Number(item[1]) : date[2] -= Number(item[1]);
//         if(date[2] < 10 && date[2] >= 1) {
//           date[2] = '0'+date[2];
//         } 
//       } else {
//         item[0] === '+' ? time[map[item[2]]] += Number(item[1]) : time[map[item[2]]] -= Number(item[1]);
//         if(time[map[item[2]]] < 10 && time[map[item[2]]] >= 0) {
//           time[map[item[2]]] = '0'+time[map[item[2]]];
//         } 
//       }
//   });
//   date = date.map(item => {
//     if(item.toString().length === 1) {
//       item = '0'+item;
//     }
//     return item;
//   })
//   time = time.map(item => {
//     if(item.toString().length === 1) {
//       item = '0'+item;
//     }
//     return item;
//   })
//   return date.join('-')+" "+time.join(":");
// }

// function jiSum(num) {
//   let sum = 0;
//   for(let i = 1; i <= num; i++) {
//     if(i % 2 !== 0) {
//       sum+=i;
//     }
//   }
//   return sum;
// }

// console.log(jiSum(50));




var readline = require('readline');
process.stdin.setEncoding('utf-8');

var rl = readline.createInterface({input: process.stdin, output: process.stdout, prompt:''});

let arr = [];
let k = 0;
let curline = 0;
rl.on('line', (line) => {
  if(curline === 0) {
    arr = line.substring(1, line.length-1).split(',').map(Number);
    arr.sort((a, b) => a - b);
    curline++;
  } else {
    k = Number(line);
    let map = a(arr);
    map.sort((a, b) => {
      return b[1] - a[1];
    })
    
    if(map.length < k) {
      console.log(-1,-1);
    } else {
      if(k === 1 || k < map.length-1) {
        if(map[k-1][1] === map[k][1]) {
          if(map[k-1][0] < map[k][0]) {
            console.log(map[k-1][0],map[k-1][1]);
          } else {
            console.log(map[k][0],map[k][1]);
          }
        } else {
          console.log(map[k-1][0],map[k-1][1]);
        }
      } else {
        if(map[k-1][1] === map[k][1]) {
          if(map[k-1][0] < map[k][0]) {
            console.log(map[k-1][0],map[k-1][1]);
          } else {
            console.log(map[k][0],map[k][1]);
          }
        } else if(map[k-2][1] === map[k-1][1]) {
          if(map[k-1][0] < map[k-2][0]) {
            console.log(map[k-1][0],map[k-1][1]);
          } else {
            console.log(map[k-2][0],map[k-2][1]);
          }
        } else {
          console.log(map[k-1][0],map[k-1][1]);
        }
      } 
    }
    rl.close()
  }
})


function a(arr) {
  let map = {};
  for(let i = 0; i < arr.length;) {
    let j = arr.lastIndexOf(arr[i]);
    map[arr[i]] = j - arr.indexOf(arr[i]) + 1;
    arr.splice(0, map[arr[i]]);
  }
  return Object.entries(map);
}
