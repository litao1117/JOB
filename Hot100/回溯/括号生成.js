/*
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。


示例 1：

输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
示例 2：

输入：n = 1
输出：["()"]
*/

var generateParenthesis = function (n) {
  let res = []
  let path = []
  function backtrack(left, right) {
    console.log(left, right)
    if (left === 0 && right === 0) {
      res.push([...path])
      return
    }
    if (left > 0) {
      path.push("(")
      backtrack(left - 1, right)
      path.pop()
    }
    if (right > left) {
      path.push(")")
      backtrack(left, right - 1)
      path.pop()
    }
  }
  backtrack(n, n)
  return res
}

console.log(generateParenthesis(3))
