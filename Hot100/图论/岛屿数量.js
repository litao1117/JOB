/**
给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

 

示例 1：

输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1
示例 2：

输入：grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
输出：3

*/

var numIslands = function (grid) {
  let res = 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        res++
        dfs(grid, i, j)
      }
    }
  }
  return res
}

// i j 四方相邻都变成水
const dfs = (gird, i, j) => {
  if (
    i < 0 ||
    j < 0 ||
    i == gird.length ||
    j == gird[0].length ||
    gird[i][j] === 0
  ) {
    return
  }
  gird[i][j] = 0
  dfs(gird, i - 1, j)
  dfs(gird, i + 1, j)
  dfs(gird, i, j - 1)
  dfs(gird, i, j + 1)
}

// console.log(1)

// new Promise((reslove, reject) => {
//   reject()
// })
//   .then(null, () => {
//     console.log(2)
//   })
//   .then(() => {
//     new Promise((reslove, reject) => {
//       reject()
//     })
//       .then(null, () => {
//         console.log("a")
//       })
//       .then(() => {
//         console.log("b")
//       })
//       .then(() => {
//         console.log("c")
//       })
//   })
//   .then(() => {
//     console.log(3)
//   })
// console.log(5)
