/**
 *  输入: [-2,1,-3,4,-1,2,1,-5,4],
    输出: 6
    解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 */

function maxSubArr(arr) {
    // 全是负数
    if(arr.every(x => x < 0)) {
        return arr.sort()[0];
    }
    let max = 0;
    let sum = 0;
    for(let i of arr) {
        sum += i;
        if(max < sum)
            max = sum;
        if(sum < 0)
            sum = 0;
    }
    return max;
}

console.log(maxSubArr([-2,1,-3,4,-1,2,1,-5,4]));