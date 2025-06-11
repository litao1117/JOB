/**
给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。
 */
var getIntersectionNode = function (headA, headB) {
  let p = headA,
    q = headB
  while (p !== q) {
    p = p === null ? headB : p.next
    q = q === null ? headA : q.next
  }
  return p
}
