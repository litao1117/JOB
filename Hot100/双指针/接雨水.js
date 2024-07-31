/** 
    给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

    示例 1：

    输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
    输出：6
    解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
    
    示例 2：

    输入：height = [4,2,0,3,2,5]
    输出：9
*/
/**
 * @param {number[]} height
 * @return {number}
 */
// 双指针
var trap = function (height) {
  let l = 0,
    r = height.length - 1
  let res = 0
  let leftMax = 0,
    rightMax = 0
  while (l < r) {
    // 找最高柱子
    leftMax = Math.max(leftMax, height[l])
    rightMax = Math.max(rightMax, height[r])
    // 比较当前左右柱子高度
    if (height[l] < height[r]) {
      // 左边柱子高度小于等于右边柱子高度，则左边柱子可以接水
      // 左边最高柱子高度减去当前柱子高度
      res += leftMax - height[l]
      l++
    } else {
      res += rightMax - height[r]
      r--
    }
  }
  return res
}

// console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))

// 动态规划
var trap2 = (height) => {
  // 两个数组，i 处 分别表示 i 坐标左边最高柱子高度和右边最高柱子高度
  let leftMax = new Array(height.length).fill(0)
  let rightMax = new Array(height.length).fill(0)
  let len = height.length
  // 初始化
  leftMax[0] = height[0]
  rightMax[height.length - 1] = height[height.length - 1]
  // 正向遍历得到左柱子高度
  for (let i = 1; i < len; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i])
  }
  // 反向得到右柱子
  for (let i = len - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i])
  }
  // 从头遍历，得到能接到雨水的量
  let res = 0
  for (let i = 0; i < len; i++) {
    res += Math.min(leftMax[i], rightMax[i]) - height[i]
  }
  return res
}
console.log(trap2([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
