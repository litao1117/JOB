/*
给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

 

示例 1：


输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
输出：true
示例 2：


输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
输出：true
示例 3：


输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
输出：false

*/
var exist = function (board, word) {
  let m = board.length
  let n = board[0].length
  let visited = new Array(m).fill(0).map(() => new Array(n).fill(false))

  const backtrack = (i, j, index) => {
    if (index === word.length) {
      return true
    }
    if (i < 0 || i >= m || j < 0 || j >= n || visited[i][j]) {
      return false
    }
    if (board[i][j] !== word[index]) {
      return false
    }
    visited[i][j] = true
    if (
      backtrack(i + 1, j, index + 1) ||
      backtrack(i - 1, j, index + 1) ||
      backtrack(i, j + 1, index + 1) ||
      backtrack(i, j - 1, index + 1)
    ) {
      return true
    }
    visited[i][j] = false
    return false
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (backtrack(i, j, 0)) {
        return true
      }
    }
  }
  return false
}

console.log(
  exist(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCCED"
  )
)
