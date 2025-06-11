/**
给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

注意：

对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
如果 s 中存在这样的子串，我们保证它是唯一的答案。
 
示例 1：

输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。
示例 2：

输入：s = "a", t = "a"
输出："a"
解释：整个字符串 s 是最小覆盖子串。
示例 3:

输入: s = "a", t = "aa"
输出: ""
解释: t 中两个字符 'a' 均应包含在 s 的子串中，
因此没有符合条件的子字符串，返回空字符串。

 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let need = new Map()
  let window = new Map()
  // 保存t字符串每个字符出现的次数
  for (let i = 0; i < t.length; i++) {
    need.set(t[i], (need.get(t[i]) || 0) + 1)
  }
  // 窗口左右边界
  let left = 0,
    right = 0,
    start = 0,
    len = Number.MAX_VALUE
  // 有效字符数，当有效字符数和need的字符数相等时，表示窗口中包含t中所有字符
  let valid = 0
  while (right < s.length) {
    let c = s[right]
    right++
    if (need.has(c)) {
      // 如果当前字符是t中包含的，更新窗口中该字符出现的次数
      window.set(c, (window.get(c) || 0) + 1)
      //   如果当前窗口内该字符与need中该字符数相等，表明有了一个有效字符
      if (window.get(c) === need.get(c)) {
        valid++
      }
    }
    //   当有效字符数和need的字符数相等时，表示窗口中包含t中所有字符，需要收缩窗口
    // 因为窗口左侧可能存在不在t中的字符，所以用while循环判断，直至当前窗口不满足包含t中所有字符
    while (valid === need.size) {
      // 更新最小覆盖子串
      if (right - left < len) {
        start = left
        len = right - left
      }
      let d = s[left]
      left++
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) {
          valid--
        }
        window.set(d, window.get(d) - 1)
      }
    }
  }
  return len === Number.MAX_VALUE ? "" : s.substr(start, len)
}
console.log(minWindow("ADOBECODEBANC", "ABC"))
