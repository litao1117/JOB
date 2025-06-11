/**
给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 小的元素（从 1 开始计数）。

示例 1：
输入：root = [3,1,4,null,2], k = 1
输出：1

示例 2：
输入：root = [5,3,6,2,4,null,null,1], k = 3
输出：3
 */

// 还是中序遍历，找到第k小
var kthSmallest = function (root, k) {
  let rank = 0
  let res = null
  const inorder = (root, k) => {
    if (!root) return null
    inorder(root.left, k)
    rank++
    if (rank === k) {
      res = root.val
      return
    }
    inorder(root.right, k)
  }
  inorder(root, k)
  return res
}
