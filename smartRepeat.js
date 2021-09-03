/**
 * 智能重复
 * 例：
 *  输入2[2[a]1[b]]  
 *  输出aabaab
 */


// 栈
function smartRepeat(templateStr) {
    // 指针
    var index = 0;
    // 栈一  存放数字
    var stack1 = [];
    // 栈二  存放临时字符串
    var stack2 = [];
    // 剩余字符串
    var rest = templateStr;

    while(index < templateStr.length - 1) {
        // 剩余部分
        rest = templateStr.substring(index);
        // 看当前剩余部分是不是以数字和[开头
        if(/^\d+\[/.test(rest)) {
            // 得到这个数字
            let nums = Number(rest.match(/^(\d+)\[/)[1]);
            // 把数字压栈
            stack1.push(nums);
            // 把空字符串压栈
            stack2.push("");
            // 让指针后移，nums这个数字多少位就往后移多少位+1   这一位是[
            index += nums.toString().length + 1;
        } else if(/^\w+\]/.test(rest)) {
            // 如果这个字符是字母，就把栈顶这项改为这个字母
            let word = rest.match(/^(\w+)\]/)[1];
            stack2[stack2.length-1] = word;
            // 指针后移 word的长度
            index += word.length;
        } else if(rest[0] === "]") {
            // 如果这个字符是]，那么就1.将stack1弹栈2.将stack2弹栈3.把字符串栈顶元素重复数字栈弹出元素的次数拼接到新栈顶
            let times = stack1.pop();
            let word = stack2.pop();
            // 使用es6repeat方法
            stack2[stack2.length-1] += word.repeat(times);
            index++;
        }
        
    }
    // while结束以后,stack1和stack2中肯定还剩余一项，返回栈2中剩下的这一项，重复栈1中剩下的这1项次数，组成的这个字符串。如果剩的个数不对，那就是用户的问题，方括号没有闭合。
    console.log(index, stack1, stack2);
    return stack2[0].repeat(stack1[0]);
}

let res = "1[2[a]]";
// console.log(res.match(/^(\d+)\[/));

console.log(smartRepeat("3[2[3[a]1[b]]4[d]]"));