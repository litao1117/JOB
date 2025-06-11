/**
二叉树中的 路径 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。

路径和 是路径中各节点值的总和。

给你一个二叉树的根节点 root ，返回其 最大路径和 。

示例 1：
输入：root = [1,2,3]
输出：6
解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6

示例 2：
输入：root = [-10,9,20,null,null,15,7]
输出：42
解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42
 */
const maxPathSum = function (root) {
  let max = -Infinity
  const dfs = (node) => {
    if (!node) return 0
    const left = Math.max(dfs(node.left), 0)
    const right = Math.max(dfs(node.right), 0)
    max = Math.max(max, left + right + node.val)
    return Math.max(left, right) + node.val
  }
  dfs(root)
  return max
}
