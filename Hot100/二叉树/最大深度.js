/**
给定一个二叉树 root ，返回其最大深度。

二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。

 

示例 1：
输入：root = [3,9,20,null,null,15,7]
输出：3
示例 2：

输入：root = [1,null,2]
输出：2
 
 */
var maxDepth = function (root) {
  if (!root) {
    return 0
  }
  let leftMax = maxDepth(root.left)
  let rightMax = maxDepth(root.right)
  return Math.max(leftMax, rightMax) + 1
}
