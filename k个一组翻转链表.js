/**
 * 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。

k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
 */
const reverseList = function (head, tail) {
  let pre = tail.next
  let cur = head
  while (pre !== tail) {
    let temp = cur.next
    cur.next = pre
    pre = cur
    cur = temp
  }
  return [tail, head]
}

var reverseKGroup = function (head, k) {
  let hair = new ListNode(0)
  hair.next = head
  let pre = hair

  while (head) {
    let tail = pre
    // 找到k个节点的尾节点
    for (let i = 0; i < k; i++) {
      tail = tail.next
      // 如果找不到k个节点，则直接返回头节点
      if (!tail) {
        return hair.next
      }
    }
    const nex = tail.next
    // 翻转k个节点，返回新的头节点和尾节点
    const [nextHead, nextTail] = reverseList(head, tail)
    // 将翻转后的链表与前一个节点连接起来
    pre.next = nextHead
    // 将翻转后的链表与后一个节点连接起来
    nextTail.next = nex
    pre = nextTail
    head = nextTail.next
  }
  return hair.next
}
