我们项目开发时，常需要安装依赖，需要有一个规定去使用什么方式去安装依赖
vue3使用的是npm的preinstall钩子，只能使用pnpm的方式安装依赖，否则报错
```js
// vue-next/package.json
{
  "private": true,
  "version": "3.2.22",
  "scripts": {
    "preinstall": "node ./scripts/preinstall.js",
  }
}

// vue-next/scripts/preinstall.js
if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository requires using pnpm as the package manager ` +
      ` for scripts to work properly.\u001b[39m\n`
  )
  process.exit(1)
}

```
这样做确实能够解决不规定安装方式这个问题，但是每次都需要写这段代码
vite中使用了only-allow这个包
```js
// 源码
// only-allow/bin.js
#!/usr/bin/env node
const whichPMRuns = require('which-pm-runs')
const boxen = require('boxen')

const argv = process.argv.slice(2)
if (argv.length === 0) {
  console.log('Please specify the wanted package manager: only-allow <npm|pnpm|yarn>')
  process.exit(1)
}
// 第一个参数则是 用户传入的希望使用的包管理器
// 比如 npx only-allow pnpm 
// 这里调试是 node bin.js pnpm
const wantedPM = argv[0]
// npm pnpm yarn 都不是，则报错
if (wantedPM !== 'npm' && wantedPM !== 'pnpm' && wantedPM !== 'yarn') {
  console.log(`"${wantedPM}" is not a valid package manager. Available package managers are: npm, pnpm, or yarn.`)
  process.exit(1)
}
// 使用的包管理器
const usedPM = whichPMRuns()
// 希望使用的包管理器 不相等，则报错。
// - npm  提示使用 npm install
// - pnpm 提示使用 pnpm install
// - yarn 提示使用 yarn install
// 最后退出进程
if (usedPM && usedPM.name !== wantedPM) {
  const boxenOpts = { borderColor: 'red', borderStyle: 'double', padding: 1 }
  switch (wantedPM) {
    case 'npm':
      console.log(boxen('Use "npm install" for installation in this project', boxenOpts))
      break
    case 'pnpm':
      console.log(boxen(`Use "pnpm install" for installation in this project.
        If you don't have pnpm, install it via "npm i -g pnpm".
        For more details, go to https://pnpm.js.org/`, boxenOpts))
      break
    case 'yarn':
      console.log(boxen(`Use "yarn" for installation in this project.
        If you don't have Yarn, install it via "npm i -g yarn".
        For more details, go to https://yarnpkg.com/`, boxenOpts))
      break
  }
  process.exit(1)
}
```
    process.argv 属性返回一个数组，由命令行执行脚本时的各个参数组成。它的第一个成员总是 node，第二个成员是脚本文件名，其余成员是脚本文件的参数。
首先通过process.argv获取脚本文件的参数，进而获取项目希望使用的包管理器，判断是否是npm，yarn，pnpm，都不是则报错
然后通过which-pm-runs获取当前使用的包管理器
```js
// which-pm-runs源码
'use strict'
module.exports = function () {
  if (!process.env.npm_config_user_agent) {
    return undefined
  }
  return pmFromUserAgent(process.env.npm_config_user_agent)
}

function pmFromUserAgent (userAgent) {
  const pmSpec = userAgent.split(' ')[0]
  const separatorPos = pmSpec.lastIndexOf('/')
  return {
    name: pmSpec.substr(0, separatorPos),
    version: pmSpec.substr(separatorPos + 1)
  }
}
```
    process.env.npm_config_user_agent是类似这样的字符串 "yarn/1.22.10 npm/? node/v14.16.0 linux x64"
判断当前使用的和希望使用的是否匹配，不匹配则警告，退出进程