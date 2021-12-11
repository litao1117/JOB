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

- 高阶组件的props都是直接透传下来，无法确定子组件的props的来源。
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
        !watch.every((val, i) => {val === watchArr[i]}) : true
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





# 组件间通信

## 1.父组件向子组件通信（props）

父组件向子组件传递props，子组件得到props后作出相应处理

## 2.子组件向父组件通信

利用回调函数，可以实现子组件向父组件通信：父组件将一个函数或者组件实例this作为props传递给子组件，子组件调用该回调函数，向父组件通信。

SubComponent.js：

```jsx
import React from "react";

const Sub = (props) => {
    const cb = (msg) => {
        return () => {
            props.callback(msg)
        }
    }
    return(
        <div>
            <button onClick = { cb("我们通信把") }>点击我</button>
        </div>
    )
}

export default Sub;
```

App.js：

```jsx
import React,{ Component } from "react";
import Sub from "./SubComponent.js";
import "./App.css";

export default class App extends Component{
    callback(msg){
        console.log(msg);
    }
    render(){
        return(
            <div>
                <Sub callback = { this.callback.bind(this) } />
            </div>
        )
    }
}
```

## 3.跨级组件通信

* 中间组件层层传递props
* 使用context对象

对于第一种方式，如果父组件结构较深，那么中间的每一层组件都要去传递 props，增加了复杂度，并且这些  props 并不是这些中间组件自己所需要的。不过这种方式也是可行的，当组件层次在三层以内可以采用这种方式，当组件嵌套过深时，采用这种方式就需要斟酌了。
使用 context 是另一种可行的方式，context 相当于一个全局变量，是一个大容器，我们可以把要通信的内容放在这个容器中，这样一来，不管嵌套有多深，都可以随意取用。
使用 context 也很简单，需要满足两个条件：

- 上级组件要声明自己支持 context，并提供一个函数来返回相应的 context 对象
- 子组件要声明自己需要使用 context

App.js：

```jsx
import React, { Component } from 'react';
import PropTypes from "prop-types";
import Sub from "./Sub";
import "./App.css";

export default class App extends Component{
    // 父组件声明自己支持 context
    static childContextTypes = {
        color:PropTypes.string,
        callback:PropTypes.func,
    }

    // 父组件提供一个函数，用来返回相应的 context 对象
    getChildContext(){
        return{
            color:"red",
            callback:this.callback.bind(this)
        }
    }

    callback(msg){
        console.log(msg)
    }

    render(){
        return(
            <div>
                <Sub></Sub>
            </div>
        );
    }
} 
```

Sub.js：

```jsx
import React from "react";
import SubSub from "./SubSub";

const Sub = (props) =>{
    return(
        <div>
            <SubSub />
        </div>
    );
}

export default Sub;
```

SubSub.js：

```jsx
import React,{ Component } from "react";
import PropTypes from "prop-types";

export default class SubSub extends Component{
    // 子组件声明自己需要使用 context
    static contextTypes = {
        color:PropTypes.string,
        callback:PropTypes.func,
    }
    render(){
        const style = { color:this.context.color }
        const cb = (msg) => {
            return () => {
                this.context.callback(msg);
            }
        }
        return(
            <div style = { style }>
                SUBSUB
                <button onClick = { cb("我胡汉三又回来了！") }>点击我</button>
            </div>
        );
    }
}
```

如果是父组件向子组件单向通信，可以使用变量，如果子组件想向父组件通信，同样可以由父组件提供一个回调函数，供子组件调用，回传参数。
 在使用 context 时，有两点需要注意：

- 父组件需要声明自己支持 context，并提供 context 中属性的 PropTypes
- 子组件需要声明自己需要使用 context，并提供其需要使用的 context 属性的 PropTypes
- 父组件需提供一个 getChildContext 函数，以返回一个初始的 context 对象

**如果组件中使用构造函数（constructor），还需要在构造函数中传入第二个参数 context，并在 super 调用父类构造函数是传入 context，否则会造成组件中无法使用 context**。

```tsx
...
constructor(props,context){
  super(props,context);
}
...
```

### 改变 context 对象

我们不应该也不能直接改变 context 对象中的属性，要想改变 context 对象，**只有让其和父组件的 state 或者 props 进行关联，在父组件的 state 或 props 变化时，会自动调用 getChildContext 方法，返回新的 context 对象**，而后子组件进行相应的渲染。
 修改 App.js，让 context 对象可变：

```jsx
import React, { Component } from 'react';
import PropTypes from "prop-types";
import Sub from "./Sub";
import "./App.css";

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            color:"red"
        };
    }
    // 父组件声明自己支持 context
    static childContextTypes = {
        color:PropTypes.string,
        callback:PropTypes.func,
    }

    // 父组件提供一个函数，用来返回相应的 context 对象
    getChildContext(){
        return{
            color:this.state.color,
            callback:this.callback.bind(this)
        }
    }

    // 在此回调中修改父组件的 state
    callback(color){
        this.setState({
            color,
        })
    }

    render(){
        return(
            <div>
                <Sub></Sub>
            </div>
        );
    }
} 
```

此时，在子组件的 cb 方法中，传入相应的颜色参数，就可以改变 context 对象了，进而影响到子组件：

```jsx
...
return(
    <div style = { style }>
        SUBSUB
        <button onClick = { cb("blue") }>点击我</button>
    </div>
);
...
```

context 同样可以应在无状态组件上，只需将 context 作为第二个参数传入：

```jsx
import React,{ Component } from "react";
import PropTypes from "prop-types";

const SubSub = (props,context) => {
    const style = { color:context.color }
    const cb = (msg) => {
        return () => {
            context.callback(msg);
        }
    }

    return(
        <div style = { style }>
            SUBSUB
            <button onClick = { cb("我胡汉三又回来了！") }>点击我</button>
        </div>
    );
}

SubSub.contextTypes = {
    color:PropTypes.string,
    callback:PropTypes.func,
}

export default SubSub;
```

## 4.非嵌套组件间通信

非嵌套组件，就是没有任何包含关系的组件，包括兄弟组件以及不在同一个父级中的非兄弟组件。对于非嵌套组件，可以采用下面两种方式：

- 利用二者共同父组件的 context 对象进行通信
- 使用自定义事件的方式

如果采用组件间共同的父级来进行中转，会增加子组件和父组件之间的耦合度，如果组件层次较深的话，找到二者公共的父组件不是一件容易的事，当然还是那句话，也不是不可以...
这里我们采用自定义事件的方式来实现非嵌套组件间的通信。
我们需要使用一个 events 包：

```undefined
npm install events --save
```

新建一个 ev.js，引入 events 包，并向外提供一个事件对象，供通信时使用：

```cpp
import { EventEmitter } from "events";
export default new EventEmitter();
```

App.js：

```jsx
import React, { Component } from 'react';

import Foo from "./Foo";
import Boo from "./Boo";

import "./App.css";

export default class App extends Component{
    render(){
        return(
            <div>
                <Foo />
                <Boo />
            </div>
        );
    }
} 
```

Foo.js：

```jsx
import React,{ Component } from "react";
import emitter from "./ev"

export default class Foo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            msg:null,
        };
    }
    componentDidMount(){
        // 声明一个自定义事件
        // 在组件装载完成以后
        this.eventEmitter = emitter.addListener("callMe",(msg)=>{
            this.setState({
                msg
            })
        });
    }
    // 组件销毁前移除事件监听
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
    }
    render(){
        return(
            <div>
                { this.state.msg }
                我是非嵌套 1 号
            </div>
        );
    }
}
```

Boo.js：

```jsx
import React,{ Component } from "react";
import emitter from "./ev"

export default class Boo extends Component{
    render(){
        const cb = (msg) => {
            return () => {
                // 触发自定义事件
                emitter.emit("callMe","Hello")
            }
        }
        return(
            <div>
                我是非嵌套 2 号
                <button onClick = { cb("blue") }>点击我</button>
            </div>
        );
    }
}
```

自定义事件是典型的发布/订阅模式，通过向事件对象上添加监听器和触发事件来实现组件间通信。

## 总结

本文总结了 React 中组件的几种通信方式，分别是：

- 父组件向子组件通信：使用 props
- 子组件向父组件通信：使用 props 回调
- 跨级组件间通信：使用 context 对象
- 非嵌套组件间通信：使用事件订阅
