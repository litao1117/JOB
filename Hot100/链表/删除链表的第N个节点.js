/**
给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

示例 1：

输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
示例 2：

输入：head = [1], n = 1
输出：[]
示例 3：

输入：head = [1,2], n = 1
输出：[1]

 */
const removeNthFromEnd = function (head, n) {
  let dum = new ListNode(0, head)
  let cur = head
  let pre = dum
  while (n--) {
    cur = cur.next
  }
  while (cur) {
    cur = cur.next
    pre = pre.next
  }
  pre.next = pre.next.next
  return dum.next
}
