# BOM

BOM：浏览器对象模型，由多个对象组成，其中window对象时BOM的顶层对象也是核心对象，其他BOM对象都是window对象的子对象

### window对象

JS的最顶层对象，包含：

> document对象，文档对象；
>
> location对象，浏览器当前URL信息；
>
> navigator对象，浏览器本身信息；
>
> screen对象，客户端屏幕信息；
>
> history对象，浏览器访问历史信息；

因为window对象是js中的顶级对象，因此所有定义在全局作用域中的变量、函数都会变成window对象的属性和方法，在调用的时候可以省略window。

例如：

* 打开窗口window.open(url);  【等价于open(url);】
* 关闭窗口 window.close(); 【等价于close();】
* 获取事件 window.event 【等价于event;】
* 获取文档 window.document 【等价于document】

