/*
你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。

在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。

例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。

 

示例 1：

输入：numCourses = 2, prerequisites = [[1,0]]
输出：true
解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。
示例 2：

输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
输出：false
解释：总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。
*/
const canFinish = function (numCourses, prerequisites) {
  let graph = Array.from(Array(numCourses), () => [])
  // 保存要学习1个课程的前置课程
  for (let i = 0; i < prerequisites.length; i++) {
    let from = prerequisites[i][1]
    let to = prerequisites[i][0]
    graph[from].push(to)
  }
  //   保存课程是否学习过
  let visited = new Array(numCourses).fill(0)
  for (let i = 0; i < numCourses; i++) {
    if (!dfs(graph, visited, i)) {
      return false
    }
  }
  // 全部课程都学习过
  return true
}
function dfs(graph, visited, i) {
  if (visited[i] === -1) {
    return false
  }
  if (visited[i] === 1) {
    return true
  }
  visited[i] = -1
  for (let j = 0; j < graph[i].length; j++) {
    //   判断依赖的课程是否学习过
    if (!dfs(graph, visited, graph[i][j])) {
      return false
    }
  }
  // 学习过了所以前置课程，当前课程可学
  visited[i] = 1
  return true
}
