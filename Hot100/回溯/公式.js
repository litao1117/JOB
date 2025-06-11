function trackback(...arguments) {
  //1满足条件return
  if (xxx) {
    //满足了 咋整
    //return
  }

  //2剩余情况继续找
  for (var i = 0; i < n; i++) {
    //3需要的地方枝解（就是跳过循环的意思）
    if (枝解条件) continue

    //4满足情况操作
    /* 操作【例如push/增加字符串末位/哈希表修改值】*/
    //5进行相应操作后继续递归寻找
    trackback(...arguments)
    //回溯（退回上级操作）
    /* 与第4步相反【例如pop()/删除字符串末位/哈希表修回值】*/
  }
}
