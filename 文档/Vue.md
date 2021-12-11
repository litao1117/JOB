# 组件间通信方式
https://segmentfault.com/a/1190000019208626
1. props/$emit
   1. 父组件向子组件传值（props）
   2. 子组件向父组件传值（$emit）
2. eventbus  
3. vuex与localstorage
4. $attrs/$listeners
5. provide/inject
6. $parent / $children与 ref

常见使用场景可以分为三类：

- 父子通信：

父向子传递数据是通过 props，子向父是通过 events（`$emit`）；通过父链 / 子链也可以通信（`$parent` / `$children`）；ref 也可以访问组件实例；provide / inject API；`$attrs/$listeners`

- 兄弟通信：

Bus；Vuex

- 跨级通信：

Bus；Vuex；provide / inject API、`$attrs/$listeners`

# vue与react思想对比
https://www.cnblogs.com/zhulimin/p/13168623.html