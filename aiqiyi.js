

// var line = read_line();
// var k = gets(1);


function removeKnum(num, k) {
    const stack = [];
    for(const item of num) {
        while(stack.length > 0 && stack[stack.length - 1] > item && k > 0) {
            stack.pop();
            k--;
        }
        stack.push(item);
    }
    while(k > 0) {
        stack.pop();
        k--;
    }
    return stack.length === 0 ? 0 : stack.join("").replace(/^0+/, "");
}
console.log(removeKnum("443321", 2));


const readline = require('readline');
process.stdin.setEncoding('utf-8');

const rl = readline.createInterface({input: process.stdin, output: process.stdout, prompt:''});

let curline = 0;
let str = '';
let start, len;
rl.on('line', (line) => {
    if(curline === 0) {
        str = line;
        curline++;
    } else {
        let inputArr = line.split(' ');
        start = Number(inputArr[0]);
        len = Number(inputArr[1]);
        let spliceStr = str.substr(start, len);
        let res = [];
        let arr1 = spliceStr.matchAll(/(IBBP)/g);
        let arr2 = spliceStr.matchAll(/(IPPPPP)/g);
        for(let item of arr1) {
            res.push(item);
        }
        for(let item of arr2) {
            res.push(item);
        }
        res.sort((a, b) => {
            return a.index - b.index;
        })
        res.forEach((item) => {
            console.log(item[1]);
        })
        rl.close();
    }
})

// const readline = require('readline');
// process.stdin.setEncoding('utf-8');

// const rl = readline.createInterface({input: process.stdin, output: process.stdout, prompt:''});

// let gop = ['IBBP', 'IPPPPP'];
// let curline = 0;
// let str = '';
// let start, len;
// rl.on('line', (line) => {
//     if(curline === 0) {
//         str = line;
//         curline++;
//     } else {
//         let inputArr = line.split(' ');
//         start = Number(inputArr[0]);
//         len = Number(inputArr[1]);
//         let spliceStr = str.substr(start, len);
//         let arr1 = spliceStr.match(/(IBBP)/g);
//         let arr2 = spliceStr.match(/(IPPPPP)/g);
//         arr1.forEach((item) => {
//             console.log(item);
//         })
//         arr2.forEach((item) => {
//             console.log(item);
//         })
//         rl.close();
//     }
// })
