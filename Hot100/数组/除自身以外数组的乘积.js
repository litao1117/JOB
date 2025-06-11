/**
给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。

题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。

请 不要使用除法，且在 O(n) 时间复杂度内完成此题。

 

示例 1:

输入: nums = [1,2,3,4]
输出: [24,12,8,6]
示例 2:

输入: nums = [-1,1,0,-3,3]
输出: [0,0,9,0,0]
 */
var productExceptSelf = function (nums) {
  // 前缀乘积和后缀乘积
  let len = nums.length
  let prefix = new Array(len).fill(1)
  let suffix = new Array(len).fill(1)
  prefix[0] = nums[0]
  for (let i = 1; i < len; i++) {
    prefix[i] = prefix[i - 1] * nums[i]
  }
  suffix[len - 1] = nums[len - 1]
  for (let i = len - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * nums[i]
  }
  let ans = new Array(len).fill(1)
  for (let i = 0; i < len; i++) {
    if (i === 0) {
      ans[i] = suffix[i + 1]
    } else if (i === len - 1) {
      ans[i] = prefix[i - 1]
    } else {
      ans[i] = prefix[i - 1] * suffix[i + 1]
    }
  }
  return ans
}

console.log(productExceptSelf([-1, 1, 0, -3, 3]))
