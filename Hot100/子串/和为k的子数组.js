/**
 * 
    给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。

    子数组是数组中元素的连续非空序列。


    示例 1：

    输入：nums = [1,1,1], k = 2
    输出：2
    示例 2：

    输入：nums = [1,2,3], k = 3
    输出：2

 */
const subArraySum = (nums, k) => {
  let res = 0
  if (nums.length === 0) {
    return 0
  }
  for (let i = 0; i < nums.length; ++i) {
    let sum = 0
    for (let j = i; j >= 0; --j) {
      sum += nums[j]
      if (sum === k) {
        res++
      }
    }
  }
  return res
}

// 前缀和
const subArraySum2 = (nums, k) => {
  let res = 0
  if (nums.length === 0) {
    return 0
  }
  // 保存数组中每个元素前缀和的个数，当前前缀和减去k的值在map中存在，则说明存在前缀和为k的子数组
  let map = new Map()
  map.set(0, 1)
  let pre = 0
  for (let i = 0; i < nums.length; ++i) {
    pre += nums[i]
    if (map.has(pre - k)) {
      res += map.get(pre - k)
    }
    if (map.has(pre)) {
      map.set(pre, map.get(pre) + 1)
    } else {
      map.set(pre, 1)
    }
  }
  return res
}
console.log(subArraySum2([1, 1, 1], 2))
