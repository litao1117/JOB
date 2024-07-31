/**
    给你一个整数数组 nums ，判断是否存在三元组[nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。

    注意：答案中不可以包含重复的三元组。


    示例 1：
    [-4, -1, -1, 0, 1, 2]
    输入：nums = [-1,0,1,2,-1,-4]
    输出：[[-1,-1,2],[-1,0,1]]
    解释：
    nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
    nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
    nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
    不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
    注意，输出的顺序和三元组的顺序并不重要。
    示例 2：

    输入：nums = [0,1,1]
    输出：[]
    解释：唯一可能的三元组和不为 0 。
    示例 3：

    输入：nums = [0,0,0]
    输出：[[0,0,0]]
    解释：唯一可能的三元组和为 0 。
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)

  let res = []
  for (let i = 0; i < nums.length; i++) {
    let curN = nums[i]
    //   数组排序后，当前值大于0后后面不可能会有等于0的三个数，跳出循环
    if (curN > 0) {
      break
    }
    // 排序后，当前值和前一个值一样时，结果会重复，跳过
    if (i > 0 && curN === nums[i - 1]) {
      continue
    }
    let l = i + 1,
      r = nums.length - 1
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r]
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]])
        //   跳过重复值
        while (l < r && nums[l] == nums[l + 1]) l++ // 去重
        while (l < r && nums[r] == nums[r - 1]) r-- // 去重
        l++
        r--
      } else if (sum < 0) l++
      else if (sum > 0) r--
    }
  }
  return res
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]))
