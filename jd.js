const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let arrNeed = [];
let arrGet = [];
let n = 0;
let res = 0;
let curline = 0;
rl.on('line', (line) => {
    if(curline === 0) {
        n = parseInt(line);
        curline++;
    } else {
        let lineArr = line.split(' ').map(Number);
        arrNeed.push(lineArr[0]);
        arrGet.push(lineArr[1]);
        curline++;
    }
    if(curline > n) {
        let sum = arrGet.reduce((a, b) => {
            return a+b;
        }, 0);
        let get = {};
        for(let i = 0; i < arrNeed.length; i++) {
            get[arrNeed[i]] = arrGet[i];
        }
        console.log(get);
        console.log(getMin(arrNeed, get, sum));
        rl.close();
    }
})

[100, 200, 1000]
function getMin(need, get, sum) {
    need.sort((a, b) => {
        return a-b;
    });
    console.log(need);
    let cur = need[0];
    let i = 0;
    let min = need[i];
    while(cur != (sum+min)) {
        need.forEach((item) => {
            if(item <= cur) {
                cur += get[item];
            }
        })
        console.log(cur);
        if(cur != (sum+min)) {
            i++;
            cur = need[i];
            min = need[i];
        }
    }
    return min;
}


// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// let arr = [];
// let n = 0;
// let res = 0;
// let curline = 0;
// rl.on('line', (line) => {
//     if(curline === 0) {
//         // n = parseInt(line);
//         curline++;
//     } else {
//         arr = line.split(' ').map(Number);
//         // arr.sort();
//         // let map = {};
//         // while(arr.length > 1) {
//         //     let min = arr[0];
//         //     let max = arr[arr.length-1]
//         //     res += max-min;
           
            
//         // }
//         console.log(maxSum(arr));
//         rl.close();
//     }
// })

// // 桶排序
// function maxSum(arr) {
//     const len = arr.length;
//     let max = Math.max(...arr);
//     let min = Math.min(...arr);
//     if(max === min) return 0;
//     let num = new Array(len+1);
//     let maxA = new Array(len+1);
//     let minA = new Array(len+1);
//     let index = 0;
//     for(let i = 0; i < len; i++) {
//         index = bucket(arr[i], max, min, len);
//         maxA[index] = num[index] ? Math.max(arr[i], maxA[index]) : arr[i];
//         minA[index] = num[index] ? Math.min(arr[i], maxA[index]) : arr[i];
//         num[index] = true;
//     }
//     let res = 0;
//     let lastMax = maxA[0];
//     for(let i = 0; i <= len; i++) {
//         if(num[i]) {
//             res = Math.max(minA[i] - lastMax, res);
//             lastMax = maxA[i];
//         }
//     }
//     return res;
// }

// function bucket(value, max, min, len) {
//     return parseInt((value-min)/((max-min)/len));
// }