/**
给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的
子集
（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。


示例 1：

输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
示例 2：

输入：nums = [0]
输出：[[],[0]]

 */
const subsets = function (nums) {
  let res = []
  let path = []

  const backtrack = (start) => {
    res.push([...path])

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i])
      backtrack(i + 1)
      path.pop()
    }
  }

  backtrack(0)

  return res
}

console.log(subsets([1, 2, 3]))
