/**

给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
返回 滑动窗口中的最大值 。

示例 1：

输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
示例 2：

输入：nums = [1], k = 1
输出：[1]
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// 暴力，会超时
var maxSlidingWindow = function (nums, k) {
  let res = []
  if (nums.length === 0 || k === 0) {
    return res
  }
  let max = -Infinity
  // 得到第一个滑动窗口内的最大值
  for (let i = 0; i < k; i++) {
    if (nums[i] > max) {
      max = nums[i]
    }
  }
  res.push(max)
  for (let i = 1; i <= nums.length - k; i++) {
    if (max === nums[i - 1]) {
      max = -Infinity
      for (let j = i; j < i + k; j++) {
        if (nums[j] > max) {
          max = nums[j]
        }
      }
    } else {
      max = Math.max(max, nums[i + k - 1])
    }
    res.push(max)
  }
  return res
}
// console.log(maxSlidingWindow([1, -1], 1))

// 单调队列
var maxSlidingWindow2 = function (nums, k) {
  let queue = []
  let res = []
  for (let i = 0; i < nums.length; i++) {
    while (queue.length > 0 && queue[queue.length - 1] < nums[i]) {
      queue.pop()
    }
    queue.push(nums[i])
    if (i >= k - 1) {
      res.push(queue[0])
      if (queue[0] === nums[i - k + 1]) {
        queue.shift()
      }
    }
  }
  return res
}
console.log(maxSlidingWindow2([1, 3, -1, -3, 5, 3, 6, 7], 3))

// 分块
var maxSlidingWindow3 = function (nums, k) {}
