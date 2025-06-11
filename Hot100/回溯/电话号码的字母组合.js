/*
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。


示例 1：

输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
示例 2：

输入：digits = ""
输出：[]
示例 3：

输入：digits = "2"
输出：["a","b","c"]
 */
var letterCombinations = function (digits) {
  if (digits.length === 0) return []
  let map = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
  let result = []
  let path = []
  function backTracking(index) {
    if (path.length === digits.length) {
      result.push(path.join(""))
      return
    }
    let digit = digits[index]
    let letters = map[digit]
    for (let i = 0; i < letters.length; i++) {
      path.push(letters[i])
      backTracking(index + 1)
      path.pop()
    }
  }
  backTracking(0)
  return result
}

console.log(letterCombinations("23"))
