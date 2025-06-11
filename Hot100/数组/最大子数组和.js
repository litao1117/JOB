/**
给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
子数组是数组中的一个连续部分。


示例 1：

输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

示例 2：
输入：nums = [1]
输出：1
示例 3：

输入：nums = [5,4,-1,7,8]
输出：23
 */

// 指针
var maxSubArray = function (nums) {
  // 如果全是负数
  if (nums.every((item) => item < 0)) {
    return nums.sort()[0]
  }
  let max = 0,
    sum = 0
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    // 判断当前和是否大于最大值, 更新
    if (sum > max) {
      max = sum
    }
    // 如果当前和小于0, 重置为0，从下一个元素开始重算
    //   因为前面已经判断过是否都是负数，所有肯定有正数，小于0就从下一个开始找正值
    if (sum < 0) {
      sum = 0
    }
  }
  return max
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))

//
var maxSubArray2 = function (nums) {
  let max = nums[0]
  for (let i = 1; i < nums.length; i++) {
    //  重置当前位置元素值
    // 如果前一个是负数，那么不管当前是啥，两者相加必定不会变大，所以忽略
    nums[i] = Math.max(0, nums[i - 1]) + nums[i]
    // nums[i]保存的是当前位置子数组最大和
    max = Math.max(max, nums[i])
  }
  return max
}
