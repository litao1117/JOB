/*
给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。

示例 1：

输入：root = [1,null,2,3]
输出：[1,3,2]
示例 2：

输入：root = []
输出：[]
示例 3：

输入：root = [1]
输出：[1]
*/
var inorderTraversal = function (root) {
  let res = []
  if (!root) {
    return res
  }
  let left = inorderTraversal(root.left)
  res.push(root.val)
  let right = inorderTraversal(root.right)
  return [...left, ...res, ...right]
}
