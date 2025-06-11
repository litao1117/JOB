/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长 子串的长度。

    示例 1:

    输入: s = "abcabcbb"
    输出: 3 
    解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
    示例 2:

    输入: s = "bbbbb"
    输出: 1
    解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
    示例 3:

    输入: s = "pwwkew"
    输出: 3
    解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
        请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let maxLen = 1
  let len = s.length
  let map = new Map()
  let start = 0
  for (let i = 0; i < len; i++) {
    // map中存在说明重复，更新start值为重复字符后一位
    if (map.get(s[i])) {
      start = Math.max(start, map.get(s[i]))
    }
    // 设置当前字符索引
    map.set(s[i], i + 1)
    maxLen = Math.max(maxLen, i - start + 1)
  }
  return maxLen
}

console.log(lengthOfLongestSubstring("pwwkew"))
