/**
给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

 

示例 1：


输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
示例 2：

输入：l1 = [0], l2 = [0]
输出：[0]
示例 3：

输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
 */
const addTwoNumbers = function (l1, l2) {
  let head = new ListNode(0)
  let cur = head
  let curry = 0
  while (l1 || l2) {
    let l1val = l1 ? l1.val : 0
    let l2val = l2 ? l2.val : 0
    let sum = l1val + l2val + curry
    if (sum > 9) {
      cur.next = new ListNode(sum % 10)
      curry = 1
    } else {
      cur.next = new ListNode(sum)
      curry = 0
    }
    cur = cur.next
    l1 = l1 ? l1.next : null
    l2 = l2 ? l2.next : null
  }
  if (curry) {
    cur.next = new ListNode(1)
  }
  return head.next
}
