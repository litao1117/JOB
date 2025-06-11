/**
给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

示例 1:
输入: [1,2,3,null,5,null,4]
输出: [1,3,4]
示例 2:

输入: [1,null,3]
输出: [1,3]
示例 3:

输入: []
输出: []
 */

// 层序遍历，返回每一层的最后一个元素
var rightSideView = function (root) {
  let res = []
  let stack = []
  if (!root) {
    return res
  }
  stack.push(root)
  while (stack.length) {
    let len = stack.length
    while (len) {
      let cur = stack.shift()
      if (len === 1) {
        res.push(cur.val)
      }
      if (cur.left) {
        stack.push(cur.left)
      }
      if (cur.right) {
        stack.push(cur.right)
      }
      len--
    }
  }
  return res
}
