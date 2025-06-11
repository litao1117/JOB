/**
 * 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。


示例 1:

输入: s = "cbaebabacd", p = "abc"
输出: [0,6]
解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
 示例 2:

输入: s = "abab", p = "ab"
输出: [0,1,2]
解释:
起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
 */
const fn = (s, p) => {
  if (!s || !p || s.length < p.length) {
    return []
  }
  let res = []
  // 保存滑动窗口内子串和p串每个字母出现的数量
  let sCount = new Array(26).fill(0)
  let pCount = new Array(26).fill(0)
  for (let i = 0; i < p.length; i++) {
    sCount[s.charCodeAt(i) - "a".charCodeAt(0)]++
    pCount[p.charCodeAt(i) - "a".charCodeAt(0)]++
  }
  if (sCount.toString() === pCount.toString()) {
    res.push(0)
  }
  for (let i = 1; i < s.length - p.length + 1; i++) {
    // 每次移动窗口都是新增一个字母，移除一个字母
    sCount[s.charCodeAt(i + p.length - 1) - "a".charCodeAt(0)]++
    sCount[s.charCodeAt(i - 1) - "a".charCodeAt(0)]--
    if (sCount.toString() === pCount.toString()) {
      res.push(i)
    }
  }
  return res
}

console.log(fn("abab", "ab"))
