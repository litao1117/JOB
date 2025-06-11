const reverseKGroup = function (head, k) {
  let hair = new ListNode(0)
  hair.next = head
  let pre = hair
  while (head) {
    let tail = pre
    // 找到k个节点的尾节点
    for (let i = 0; i < k; ++i) {
      tail = tail.next
      // 如果不够k个那么直接返回头节点
      if (!tail) return hair.next
    }
    const nex = tail.next
    //  获取翻转后的头尾节点
    const [newHead, newTail] = reverseList(head, tail)
    pre.next = newHead
    newTail.next = nex
    pre = newTail
    head = nex
  }
  return hair.next
}

// 翻转头结点与尾节点之间的链表
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
