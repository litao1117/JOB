# React Hook机制

## 1.前言

### 1.1React.mixin

React.mixin是通过React.createClass创建组件时使用的

mixin的原理其实就是将[mixin]里面的方法合并到组件的prototype上。

```js
var logMixin = {
    alertLog:function(){
        alert('alert mixin...')
    },
    componentDidMount:function(){
        console.log('mixin did mount')
    }
}
```

```js
var MixinComponent = React.createClass({
  mixins:[logMixin],
  componentDidMount:function() {
    document.body.addEventListener('click',()=>{
    	this.alertLog()
    })
    console.log('component did mount')
  }
})
// 打印
// component did mount
// mixin did mount
// 点击页面时
// alert mixin...
```

mixin就是把logMixin的方法合并到了MixinComponent组件中，如果有同名的声明周期函数都会执行，render()除外，同名会报错。

### 1.2高阶组件

组件是React中代码复用的基本单元，但是有些模式并不适合传统组件。

高阶组件就是一个函数，接收一个组件，返回一个新的组件，代码复用性更强，提高了开发效率，也更加同意维护。

但是HOC还是有一些缺陷：

- 高阶组件的props都是直接透传下来，无法确实子组件的props的来源。
- 可能会出现props重复导致报错。
- 组件的嵌套层级太深。
- 会导致ref丢失。

## 2.React Hook

解决了功能复用，状态逻辑难以复用的难题。使用函数式创建组件，摆脱class方式，不必为this工作方式困扰。

### 2.1实现原理（粗暴）

#### setState

当调用useState时，会返回一个变量和函数，其参数为返回变量的默认值。

```js
let val;
function useState(initVal) {
  val = val || initVal;
  function setVal(newVal) {
    val = newVal;
    render();   // 修改值后要重新渲染页面
  }
  return [val, setVal];
}
```

#### useEffect  

useEffect是一个函数，有两个参数一个是函数，一个是可选参数-数组，根据第二个参数中是否有变化来判断是否执行第一个参数的函数。

```js
let watchArr;
function useEffect(fn, watch) {
  // 判断是否有变化
  const hasWatchChange = watchArr ? 
        !watch.every((val, i) => {var === watchArr[i]}) : true
  if(hasWatchChange) {
    fn();
    watchArr = watch;
  }
}
```

> 通过全局变量来保证状态的实时更新；如果组件要多次调用，就会发生变量冲突的问题。

#### 解决全局变量冲突

```js
// 通过数组维护变量
let memoizedState = [];
let currentCursor = 0;

function useState(initVal) {
  memoizedState[currentCursor] = memoizedState[currentCursor] || initVal;
  function setVal(newVal) {
    memoizedState[currentCursor] = newVal;
    render();
  }
  // 返回state，指针后移
  return [memoizedState[currentCursor++], setVal];
}
```

```js
function userEffect(fn, watch) {
  const hasWatchChange = memoizedState[currentCursor] ? 
        !watch.every((val, i) => {var === memoizedState[currentCursor][i]}) : true;
  if(hasWatchChange) {
    fn();
    memoizedState[currentCursor++] = watch;
  }
}
```

**将useState、useEffect按照调用顺序加入全局数组中，每次更新时，按照顺序取值和逻辑判断**

### 2.2应用

#### 2.2.1 模拟生命周期

* constructor: 函数组件不需要构造函数，通过useState初始化state
* componentDidMount：通过useEffect传入第二个参数为[]实现
* componentDidUpdate：通过useEffect传入第二个参数为空或变动的数组实现
* componentWillUnmount：通过useEffect函数return一个函数来模拟
* shouldComponentUpdate：你可以用 React.memo 包裹一个组件来对它的 props 进行浅比较。来模拟是否更新组件

#### 2.2.2 进行数据请求

