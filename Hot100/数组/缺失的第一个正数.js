/**
给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。

请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。
 

示例 1：

输入：nums = [1,2,0]
输出：3
解释：范围 [1,2] 中的数字都在数组中。
示例 2：

输入：nums = [3,4,-1,1]
输出：2
解释：1 在数组中，但 2 没有。
示例 3：

输入：nums = [7,8,9,11,12]
输出：1
解释：最小的正数 1 没有出现。
 */
var firstMissingPositive = function (nums) {
  //  将每个数字放到对应的位置
  let len = nums.length
  let cur = 0
  while (cur < len) {
    const item = nums[cur]
    if (item > 0 && item <= len && item !== cur + 1) {
      let temp = nums[item - 1]
      nums[item - 1] = item
      nums[cur] = temp
      if (item === nums[cur]) {
        cur++
      }
    } else {
      cur++
    }
  }
  for (let i = 0; i < len; i++) {
    if (nums[i] !== i + 1) {
      return i + 1
    }
  }
  return len + 1
}

console.log(firstMissingPositive([3, 4, -1, 1]))
