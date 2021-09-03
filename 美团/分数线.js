/**
 * 输入参赛人数，淘汰人数区间，选手成绩，输出分数线
 */

function scoreLine(count, score) {
  const sum = count[0];
  const min = count[1];
  const max = count[2];
  score.sort();
  // 遍历，淘汰人数
  for(let i = min; i <= max; i++) {
    const scoreline = score[i - 1];
    const outNum = score.lastIndexOf(scoreline) + 1;
    const passNum = score.length - outNum;
    if(outNum >= i && outNum <= max && passNum >= min && passNum <= max && (outNum+passNum) === sum) {
      return scoreline;
    } 
  }
  return -1;
}

// const count = [8, 4, 5];
// const score = [1,2,3,4,5,6,7,8];
// const output = scoreLine(count, score);
// console.log(output);

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
let inputArr = [];
let lineNum = 1;
rl.on('line', function(line) {
  inputArr.push(line);
  if(lineNum == 2) {
    let count = inputArr[0].split(' ');
    let score = inputArr[1].split(' ');
    count = count.map(item => parseInt(item));
    score = score.map(item => parseInt(item));
    const output = scoreLine(count, score);
    console.log(count);
    console.log(score);
    console.log(output);
    rl.close();
  } else {
    lineNum++;
  }
})

rl.on('close', () => {
  process.exit(0)
})