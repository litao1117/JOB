/*
在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：

值 0 代表空单元格；
值 1 代表新鲜橘子；
值 2 代表腐烂的橘子。
每分钟，腐烂的橘子 周围 4 个方向上相邻 的新鲜橘子都会腐烂。

返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1 。


示例 1：
输入：grid = [[2,1,1],[1,1,0],[0,1,1]]
输出：4

示例 2：
输入：grid = [[2,1,1],[0,1,1],[1,0,1]]
输出：-1
解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个方向上。

示例 3：
输入：grid = [[0,2]]
输出：0
解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。
*/
const orangesRotting = function (grid) {
  let queue = []
  let fresh = 0
  let time = 0
  let m = grid.length
  let n = grid[0].length
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        // 新鲜橘子数目，当fresh为0时意味着全部腐烂
        fresh++
      } else if (grid[i][j] === 2) {
        // 腐烂橘子的位置
        queue.push([i, j])
      }
    }
  }
  while (queue.length && fresh) {
    const size = queue.length
    for (let i = 0; i < size; i++) {
      // 从队列依次弹出腐烂橘子，上下左右都腐烂，同时推入队列
      const [x, y] = queue.shift()
      for (let [i, j] of [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ]) {
        if (
          x + i >= 0 &&
          x + i < m &&
          y + j >= 0 &&
          y + j < n &&
          grid[x + i][y + j] === 1
        ) {
          grid[x + i][y + j] = 2
          queue.push([x + i, y + j])
          fresh--
        }
      }
    }
    time++
  }

  // 还有新鲜的说明不可能腐烂
  return fresh ? -1 : time
}

console.log(
  orangesRotting([
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1],
  ])
)
