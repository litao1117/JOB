/*
以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。


示例 1：

输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
示例 2：

输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
*/

// 暴力
var merge = function (intervals) {
  let l = 0,
    r = 1
  let res = []
  intervals.sort((a, b) => a[0] - b[0])
  while (l < intervals.length) {
    if (r >= intervals.length) {
      res.push(intervals[l])
      break
    }
    if (intervals[l][1] >= intervals[r][0]) {
      intervals[l][1] = Math.max(intervals[l][1], intervals[r][1])
      r++
    } else {
      res.push(intervals[l])
      l = r
      r++
    }
  }
  return res
}

console.log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ])
)
