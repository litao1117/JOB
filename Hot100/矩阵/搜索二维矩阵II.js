/*
编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：

每行的元素从左到右升序排列。
每列的元素从上到下升序排列。
 
示例 1：

输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
输出：true
示例 2：

输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
输出：false

*/

// 确定位置，在哪行哪列
var searchMatrix = function (matrix, target) {
  let m = matrix.length
  let n = matrix[0].length
  let i = 0,
    j = n - 1
  while (i < m && j >= 0) {
    if (matrix[i][j] === target) {
      return true
    } else if (matrix[i][j] > target) {
      // 当前元素大于目标值，说明不在这一列
      j--
    } else {
      // 不在这一行
      i++
    }
  }
  return false
}
console.log(
  searchMatrix(
    [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ],
    18
  )
)
