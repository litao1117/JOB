/**
给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。


示例 1：


输入：head = [4,2,1,3]
输出：[1,2,3,4]
示例 2：


输入：head = [-1,5,3,4,0]
输出：[-1,0,3,4,5]
示例 3：

输入：head = []
输出：[]
 */

// 时间复杂度要求 nlogn，空间复杂度常数级(比较难)

// 递归，归并排序
var sortList = function (head) {
  if (!head || !head.next) return head
  let slow = head
  let fast = head.next
  let pre
  while (fast && fast.next) {
    pre = slow
    slow = slow.next
    fast = fast.next.next
  }
  pre.next = null
  let left = sortList(head)
  let right = sortList(slow)
  return merge(left, right)
}

const merge = (l1, l2) => {
  let dummy = new ListNode(0)
  let cur = dummy
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
  return dummy.next
}
