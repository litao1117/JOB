// 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
const reverseList = function (head) {
  //   let pre = null
  //   let cur = head
  //   while (cur) {
  //     let temp = cur.next
  //     cur.next = pre
  //     pre = cur
  //     cur = temp
  //   }
  //   return pre
  return recur(head, null)
}

const recur = (cur, pre) => {
  if (!cur) {
    return pre
  }
  let res = recur(cur.next, cur)
  cur.next = pre
  return res
}
