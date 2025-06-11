/**
给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。
 */
const levelOrder = function (root) {
  if (!root) return []
  let res = []
  let queue = [root]
  while (queue.length) {
    let queueLength = queue.length
    let level = []
    while (queueLength) {
      let node = queue.shift()
      level.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
      queueLength--
    }
    res.push(level)
  }
  return res
}
