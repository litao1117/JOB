/**
给你一个二叉树的根节点 root ， 检查它是否轴对称。

示例 1：


输入：root = [1,2,2,3,4,4,3]
输出：true
示例 2：


输入：root = [1,2,2,null,3,null,3]
输出：false
 
 */
var isSymmetric = function (root) {
  if (!root) return true
  return isMirror(root.left, root.right)
  function isMirror(left, right) {
    if (!left && !right) return true
    if (!left || !right) return false
    return (
      left.val === right.val &&
      isMirror(left.left, right.right) &&
      isMirror(left.right, right.left)
    )
  }
}
