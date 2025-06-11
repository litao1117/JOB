/**
给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。

示例 1：
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[[7,4,1],[8,5,2],[9,6,3]]
示例 2：
输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
 */
// 原地修改
function rotate90(matrix) {
  const n = matrix.length
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < Math.floor((n + 1) / 2); j++) {
      const temp = matrix[i][j]
      matrix[i][j] = matrix[n - j - 1][i]
      matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1]
      matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1]
      matrix[j][n - i - 1] = temp
    }
  }
  return matrix
}
function rotate90_2(matrix) {
  const n = matrix.length
  const matrix_new = new Array(n).fill(0).map(() => new Array(n).fill(0))
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrix_new[j][n - i - 1] = matrix[i][j]
    }
  }
  return matrix_new
}

// 通过对角线翻转，然后再翻转每行
var rotate3 = function (matrix) {
  let n = matrix.length
  // 先沿对角线反转二维矩阵
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      // swap(matrix[i][j], matrix[j][i]);
      let temp = matrix[i][j]
      matrix[i][j] = matrix[j][i]
      matrix[j][i] = temp
    }
  }
  // // 然后反转二维矩阵的每一行
  // for (let row of matrix) {
  //   reverse(row)
  // }

  // // 反转一维数组
  // function reverse(arr) {
  //   let i = 0,
  //     j = arr.length - 1
  //   while (j > i) {
  //     // swap(arr[i], arr[j]);
  //     let temp = arr[i]
  //     arr[i] = arr[j]
  //     arr[j] = temp
  //     i++
  //     j--
  //   }
  // }
  return matrix
}

console.log(
  rotate3([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
)
