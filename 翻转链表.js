/**
 * [1,2,3,4,5] => [5,4,3,2,1]
 */

// 双指针
const reverseList = function (head) {
  let pre = null
  let cur = head
  while (cur) {
    let temp = cur.next
    cur.next = pre
    pre = cur
    cur = temp
  }
  return pre
}

// 递归
const reverseList2 = function (head) {
  const recur = (cur, pre) => {
    // 递归终止条件，当前节点是null，返回前一个节点，也就是翻转后的头节点
    if (!cur) {
      return pre
    }
    // 递归调用，翻转下一个节点
    const res = recur(cur.next, cur)
    // 改变节点的指向
    cur.next = pre
    return res
  }
  return recur(head, null)
}
