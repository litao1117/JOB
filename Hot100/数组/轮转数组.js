/*
给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

示例 1:

输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]
示例 2:

输入：nums = [-1,-100,3,99], k = 2
输出：[3,99,-1,-100]
解释: 
向右轮转 1 步: [99,-1,-100,3]
向右轮转 2 步: [3,99,-1,-100]
*/
var rotate = function (nums, k) {
  let res = []
  // 当前索引+k 取余数组长度
  for (let i = 0; i < nums.length; i++) {
    res[(i + k) % nums.length] = nums[i]
  }
  return res
}

// console.log(rotate1([-1, -100, 3, 99], 2))
// 0 len - 3

// 翻转数组
var rotate1 = function (nums, k) {
  reverse(nums, 0, nums.length - 1)
  reverse(nums, 0, k - 1)
  reverse(nums, k, nums.length - 1)
  return nums
}

const reverse = (nums, start, end) => {
  while (start < end) {
    ;[nums[start], nums[end]] = [nums[end], nums[start]]
    start++
    end--
  }
}
console.log(rotate1([-1, -100, 3, 99], 2))
