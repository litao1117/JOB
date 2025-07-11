/**
给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。


示例 1：


输入：head = [1,2,3,4]
输出：[2,1,4,3]
示例 2：

输入：head = []
输出：[]
示例 3：

输入：head = [1]
输出：[1]

 */
const swapPairs = function (head) {
  if (!head || !head.next) return head
  let dum = new ListNode(0, head)
  let cur = head
  let pre = dum
  while (cur && cur.next) {
    let next = cur.next
    pre.next = next
    cur.next = next.next
    next.next = cur
    pre = cur
    cur = cur.next
  }
  return dum.next
}
