/**
给你二叉树的根结点 root ，请你将它展开为一个单链表：

展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
展开后的单链表应该与二叉树 先序遍历 顺序相同。
 

示例 1：


输入：root = [1,2,5,3,4,null,6]
输出：[1,null,2,null,3,null,4,null,5,null,6]
 */

var flatten = function (root) {
  if (!root) return null
  let stack = [root]
  let res = []
  // 先序遍历
  while (stack.length) {
    let cur = stack.pop()
    res.push(cur)
    if (cur.right) stack.push(cur.right)
    if (cur.left) stack.push(cur.left)
  }
  for (let i = 0; i < res.length; i++) {
    if (i === res.length - 1) {
      res[i].left = null
      res[i].right = null
    } else {
      res[i].left = null
      res[i].right = res[i + 1]
    }
  }
  return res[0]
}
