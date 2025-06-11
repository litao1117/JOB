/**
将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

示例 1：


输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
示例 2：

输入：l1 = [], l2 = []
输出：[]
示例 3：

输入：l1 = [], l2 = [0]
输出：[0]
 */

export const mergeTwoLists = function (l1, l2) {
  let head = new ListNode(0)
  let cur = head
  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l1
      l1 = l1.next
    } else {
      cur.next = l2
      l2 = l2.next
    }
    cur = cur.next
  }
  cur.next = l1 || l2
  return head.next
}
