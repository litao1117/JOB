/**
给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。
你可以对一个单词进行如下三种操作：
插入一个字符
删除一个字符
替换一个字符
 */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const m = word1.length
  const n = word2.length
  const dp = Array.from({ length: m + 1 }, () =>
    Array.from({ length: n + 1 }).fill(0)
  )
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i
  }
  for (let i = 0; i <= n; i++) {
    dp[0][i] = i
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] =
          Math.min(dp[i][j - 1], Math.min(dp[i - 1][j], dp[i - 1][j - 1])) + 1
      }
    }
  }
  return dp[m][n]
}

/*
dp[i][j]表示word1的前i个字符变成word2的前j个字符的最短编辑距离

增：dp[i][j] = dp[i][j - 1] + 1
删：dp[i][j] = dp[i - 1][j] + 1
改：dp[i][j] = dp[i - 1][j - 1] + 1
*/
console.log(minDistance("horse", "ros"))
