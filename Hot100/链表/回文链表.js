/**
给你一个单链表的头节点 head ，请你判断该链表是否为
回文链表
。如果是，返回 true ；否则，返回 false 。
 */

var isPalindrome = function (head) {
  let arr = []
  while (head) {
    arr.push(head.val)
    head = head.next
  }
  return arr.join("") === arr.reverse().join("")
}

var isPalindrome = function (head) {}
