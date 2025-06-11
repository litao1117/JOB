/*
Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补全和拼写检查。

请你实现 Trie 类：

Trie() 初始化前缀树对象。
void insert(String word) 向前缀树中插入字符串 word 。
boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；否则，返回 false 。
 

示例：

输入
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
输出
[null, null, true, false, true, null, true]

解释
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // 返回 True
trie.search("app");     // 返回 False
trie.startsWith("app"); // 返回 True
trie.insert("app");
trie.search("app");     // 返回 True
*/
var Trie = function () {
  this.children = {}
}

Trie.prototype.insert = function (word) {
  let node = this.children
  for (let i = 0; i < word.length; i++) {
    const char = word[i]
    if (!node[char]) {
      node[char] = {}
    }
    node = node[char]
  }
  node.isEnd = true
}

Trie.prototype.search = function (word) {
  let node = this.children
  for (let i = 0; i < word.length; i++) {
    const char = word[i]
    if (!node[char]) {
      return false
    }
    node = node[char]
  }
  return node.isEnd === true
}
Trie.prototype.startsWith = function (prefix) {
  let node = this.children
  for (let c of prefix) {
    if (!node[c]) {
      return false
    }
    node = node[c]
  }
  return true
}
