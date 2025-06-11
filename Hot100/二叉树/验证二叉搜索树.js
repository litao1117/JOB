/**
给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。

有效 二叉搜索树定义如下：

节点的左
子树
只包含 小于 当前节点的数。
节点的右子树只包含 大于 当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。
 

示例 1：

输入：root = [2,1,3]
输出：true
示例 2：

输入：root = [5,1,4,null,null,3,6]
输出：false
解释：根节点的值是 5 ，但是右子节点的值是 4 。
 */

// 中序遍历后遍历，判断是否递增
var isValidBST = function (root) {
  let pre = null
  let stack = mid(root)
  while (stack.length) {
    let cur = stack.pop()
    if (pre !== null && cur >= pre) {
      return false
    }
    pre = cur
  }
  return true
}

const mid = function (root) {
  if (!root) return []
  let res = []
  let left = mid(root.left)
  res.push(root.val)
  let right = mid(root.right)
  return [...left, ...res, ...right]
}
