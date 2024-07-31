// countPlugin.js
const chalk = require("chalk")
const fromPairs = require("lodash/fromPairs")

class CountPlugin {
  constructor(pathName = "", packageName) {
    // 项目名称
    this.packageName = packageName || ""
    // 组件库名称(可以是组件库，也可以是本地component、utils，当然要使用别名)
    this.pathName = pathName || "antd"
    // 组件库总共被引用次数
    this.totalLength = 0
    // 组件详细引用
    this.componentList = {}
  }

  sortComps() {
    // Object.fromEntries 为 es2019 API，这里用lodash/fromPairs代替
    this.componentList = fromPairs(
      Object.entries(this.componentList).sort(([, a], [, b]) => b - a)
    )
  }

  logComps() {
    const { packageName, pathName, totalLength, componentList } = this

    console.log(
      `\n项目 ${chalk.red(packageName)} 对组件库 ${chalk.cyan(
        pathName
      )} 的组件总共引用次数 ${chalk.green(totalLength)} \n`
    )

    const output = []

    Object.keys(componentList).forEach((key) => {
      const value = componentList[key]
      const percent = (
        Number((value / totalLength).toPrecision(3)) * 100
      ).toFixed(2)
      output.push({ 组件名称: key, 引用次数: value, 引用率: percent + "%" })
    })

    console.table(output)
  }

  apply(compiler) {
    // compilation 对象
    const parser = (factory) => {
      // https://www.webpackjs.com/api/parser/
      // 用到的是 JavascriptParser Hooks => parser 实例（是用来解析由 webpack 处理过的每个模块）
      // parser 位于 normalModuleFactory 中，因此需要以下操作进行获取
      factory.hooks.parser
        .for("javascript/auto")
        .tap("count-plugin", (parser) => {
          // parser 里面有一个 importSpecifier 的 hook，每个导入语句调用时都会触发这个 hook
          // 所以在这个 hook 上注册需要我们需要执行的事件
          parser.hooks.importSpecifier.tap(
            "count-plugin",
            (_statement, source, _exportName, identifierName) => {
              // 这里使用startsWith判断，所以希望组件引用是绝对路径。
              // 当然也可以使用includes判断，但是可能会有与想要计数的公共模块重名，相对路径引用也被计数。
              if (source.startsWith(this.pathName)) {
                const key = identifierName
                this.totalLength = this.totalLength + 1
                this.componentList[key] = (this.componentList[key] || 0) + 1
              }
            }
          )
        })
    }

    const done = () => {
      this.sortComps()
      this.logComps()
    }

    // 因为 parser 位于 NormalModuleFactory 中，所以往 NormalModuleFactory 挂载钩子
    compiler.hooks.normalModuleFactory.tap("count-plugin", parser)
    compiler.hooks.done.tap("count-plugin-done", done)
  }
}

module.exports = CountPlugin
