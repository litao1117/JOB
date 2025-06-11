/**
给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。

示例 1：
输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
输出：[[1,0,1],[0,0,0],[1,0,1]]

示例 2：
输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
 */
var setZeroes = function (matrix) {
  let firstLine = 1,
    firstColumn = 1
  // 遍历矩阵
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        // 将所在行和所在列的第一个元素置为0
        matrix[i][0] = 0
        matrix[0][j] = 0
        if (i === 0) {
          firstLine = 0
        }
        if (j === 0) {
          firstColumn = 0
        }
      }
    }
  }

  // 遍历矩阵第一行和第一列，元素为0则把该行和该列都置为0
  for (let i = 1; i < matrix[0].length; i++) {
    if (matrix[0][i] === 0) {
      for (let j = 0; j < matrix.length; j++) {
        matrix[j][i] = 0
      }
    }
  }
  for (let i = 1; i < matrix.length; i++) {
    if (matrix[i][0] === 0) {
      for (let j = 0; j < matrix[i].length; j++) {
        matrix[i][j] = 0
      }
    }
  }
  // 判断第一行第一列是否需要
  if (firstLine === 0) {
    for (let i = 0; i < matrix[0].length; i++) {
      matrix[0][i] = 0
    }
  }
  if (firstColumn === 0) {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i][0] = 0
    }
  }
  return matrix
}

console.log(setZeroes([[1, 0, 3]]))
