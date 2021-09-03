/**
 * 输入一个字符串，获取出现最多的字符及其次数
 * @params {string} str
 * @returns {char} s
 * @returns {number} count
 */

function stringMaxCountS(str) {
    let res = {};
    let max = 0;
    for(let i = 0; i < str.length; i++) {
        let char = str.charAt(i);
        if(res[char]) {
            res[char]++;
            if(max < res[char]) {
                max = res[char];
            }
        } else {
            res[char] = 1;
        }
    }
    console.log(res);
    console.log(max);
    for(let key in res) {
        if(res[key] === max) {
            console.log("最多的字符是" + key);
            console.log("出现的次数是" + max);
        }
    }
}
// stringMaxCountS("nininihaoa");


// 正则写法
function stringMaxCountSReg(str) {
    let arr = [...new Set(str.split(''))];
    let max = 0;
    let code = '';
    for(let i = 0; i < arr.length; i++) {
        let reg = new RegExp(arr[i], 'g');
        let val = (str.match(reg)||[]).length;
        if(val > max) {
            max = val;
            code = arr[i];
        } else if(val == max) {
            code = `${code}、${arr[i]}`;
        }
    }
    console.log(`出现次数最多的字符是：${code},次数为：${max}`);
}
stringMaxCountSReg("nininihaoa")