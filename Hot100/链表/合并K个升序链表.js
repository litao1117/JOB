/**
给你一个链表数组，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。

示例 1：

输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6
示例 2：

输入：lists = []
输出：[]
示例 3：

输入：lists = [[]]
输出：[]
 */

import { mergeTwoLists } from "./合并两个有序链表"
// 分治，优先队列js实现太麻烦
var mergeKLists = function (lists) {
  function dfs(i, j) {
    if (i === j) return lists[i] || null
    let mid = (i + j) >> 1
    return mergeTwoLists(dfs(i, mid), dfs(mid + 1, j))
  }
  return dfs(0, lists.length)
}
