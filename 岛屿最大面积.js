/**
 * 岛屿最大面积
 */
const maxAreaOfIsland = function (grid) {
  let ans = 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        // dfs
        ans = Math.max(ans, dfs(grid, i, j))
      }
    }
  }
  return ans
}

const dfs = function (grid, i, j) {
  if (
    i < 0 ||
    j < 0 ||
    i == grid.length ||
    j == grid[0].length ||
    grid[i][j] === 0
  ) {
    return 0
  }
  // 找过后置为0，防止重复
  grid[i][j] = 0
  // 向4个方向探索
  return (
    1 +
    dfs(grid, i + 1, j) +
    dfs(grid, i - 1, j) +
    dfs(grid, i, j + 1) +
    dfs(grid, i, j - 1)
  )
}

const grid = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
]
console.log(maxAreaOfIsland(grid))
