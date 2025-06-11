/**
给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。

示例 1：
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
示例 2：
输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 */
var spiralOrder = function (matrix) {
  if (matrix.length === 0) return []
  let res = []
  // 上下左右边界
  let left = 0,
    right = matrix[0].length - 1,
    top = 0,
    bottom = matrix.length - 1
  while (left <= right && top <= bottom) {
    for (let i = left; i <= right && left <= right && top <= bottom; i++) {
      res.push(matrix[top][i])
    }
    top++
    for (let i = top; i <= bottom && left <= right && top <= bottom; i++) {
      res.push(matrix[i][right])
    }
    right--
    for (let i = right; i >= left && left <= right && top <= bottom; i--) {
      res.push(matrix[bottom][i])
    }
    bottom--
    for (let i = bottom; i >= top && left <= right && top <= bottom; i--) {
      res.push(matrix[i][left])
    }
    left++
  }
  return res
}

console.log(
  spiralOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
)
