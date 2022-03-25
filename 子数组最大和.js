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
    let sum1 = 0, left = 0, right = 0, preleft = 0;
    for(let i = 0; i < arr.length; i++) {
        sum1 += arr[i];
        if(max < sum1) {
            max = sum1;
            right = i;
            left = preleft;
        }
        if(sum1 < 0) {
            sum1 = 0;
            preleft = i+1;
        }
    }
    return [max, left, right];
}

console.log(maxSubArr([-2,1,-3,4,-1,2,1,-7,4]));