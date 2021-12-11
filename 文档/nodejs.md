# nodejs

* Express是一个Node.js的基础框架，基于Connect中间件，并且自身封装了路由、视图处理功能，弊端是使用callback回调方式。

* Koa是基于Express的同一班人马开发的下一代node框架，比Express更精简，使用node新特性的中间件框架。利用Generator的特性，实现无回调的异步处理。


### 1.路由处理

#### Express：

使用express.Router类来创建可安装的模块化路由处理程序。

#### Koa：

路由处理Express是自身集成的，而Koa需要引入中间件koa-route

### 2.HTTP Request

两个框架都封装了HTTP Request对象，有一点不同是 Koa v1 使用 this，Koa v2使用ctx 取代 Express 的 req、res。

### 3.异步流程控制

Express采用callback来处理异步，Koa v1 采用 generator，Koa v2 采用 async/await。

### 4.错误处理

Express使用callback捕获异常，对于深层次的异常捕获不了

Koa使用try catch，能够更好的解决异常捕获

(try catch只可以捕获线程执行已进入try catch但未执行完try catch的时候抛出来的异常)

### 5.中间件处理

Express是基于 callback 来处理中间件的，而 KOA 则是基于 await/async；

**在异步执行中间件时，Express并非严格按照洋葱模型执行中间件，而 KOA 则是严格遵循的（体现再两者在中间件为异步函数的时候处理会有不同）。**

Express异步在回去的时候会跳过异步回调。最后执行异步函数

# 中间件

nodejs中间件本质上是一个过滤器函数

### 原理

```js
const m1 = (req, res, next) => {
  // 逻辑
  console.log('m1 start');
  next().then(() => {
    console.log('m1 end');
  });
}
const m2 = (req, res, next) => {
  // 逻辑
  next();
}
const m3 = (req, res, next) => {
  // 逻辑
  next();
}
const middlewares = [m1, m2, m3];
function useApp(req, res) {
  const next = () => {
    // 获取第一个中间件
    const middleware = middlewares.shift();
    if(middleware) {
      return Promise.resolve(middleware(req, res, next));
    } else {
      return Promise.resolve('end');
    }
  }
  next();
}
useApp();
```

> 异步中间件在回调中加入next，保证正常调用顺序


# node特性及使用场景
> Node.js使用JavaScript进行编程，运行在JavaScript（V8）引擎上。它不用建设在任何服务器软件之上，处理能力优越。Node使得编写可扩展性高的服务器变得既容易又安全。
### 特性
1. JavaScript运行环境
2. 依赖v8引擎进行代码解释
3. 事件驱动
4. 非阻塞I/O
5. 轻量、可伸缩。适用于实时数据交互
6. 单进程、单线程

### 优点
1. 高并发
2. 适合I/O密集型应用
### 缺点
1.  不适合CPU密集型应用；CPU密集型应用给Node带来的挑战主要是：由于JavaScript单线程的原因，如果有长时间运行的计算（比如大循环），将会导致CPU时间片不能释放，使得后续I/O无法发起；
* 解决方案：分解大型运算任务为多个小任务，使得运算能够适时释放，不阻塞I/O调用的发起；
2. 只支持单核CPU，不能充分利用CPU
3. 可靠性低，一旦代码某个环节崩溃，整个系统都崩溃
* 解决方案：
（1）Nnigx反向代理，负载均衡，开多个进程，绑定多个端口；（2）开多个进程监听同一个端口，使用cluster模块；
### 使用场景
1. RESTful API  
2. Web应用的UI层
3. 高并发请求、I/O密集型