# JS同步、异步、阻塞、非阻塞、事件循环、消息队列
https://www.jianshu.com/p/a81a6ed3ef3a
# JavaScript继承
## 继承方式
```js
// 父类
function Person(name) {
    this.kind = 'person';
    this.name = name;
}

```

### 构造函数继承
    直接利用call或apply方法将父类构造函数的this绑定为子类构造函数的this就可以
```js
// 子类
function student(name) {
    Person.apply(this, arguments);
}
```
    这种方式只能继承父类构造函数中的属性和方法，不能继承原型对象
### 原型实例继承
    父类的实例作为子类的原型
```js
// 子类
function student(name) {
    this.name = name;
}
student.prototype = new Person();
```
    这种方式无法实现多继承、创建子类实例时，不能向父类构造函数中传参
### 组合继承
    组合继承是原型链继承和构造函数继承的组合。结合了两种模式的优点--向父类传参（call）和复用（prototype）。
```js
// 子类
function student(name) {
    Person.call(this, name);
}
student.prototype = new Person();
```
    调用了两次父类的构造函数（耗内存）
### 原型式继承
    用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了可以随意增添属性的实例或对象。Object.create()就是这个原理。
```js
function object(obj) {
    function F(){}
    F.prototype = obj;
    return new F();
}
let super = new Person();
let child = object(super);
```
    所有的实例都会继承原型上的属性
    无法实现复用。（新实例属性都是后面添加的）
### 寄生式继承
    就是给原型式继承外面套个壳子。
```js
function object(obj) {
    function F(){}
    F.prototype = obj;
    return new F();
}
var sup = new Person();
// 以上是原型式继承，给原型式继承再套个壳子传递参数
function subobject(obj) {
    var sub = object(obj);
    sub.name = 'ming';
    return sub;
}
var sup2 = subobject(sup);
```

### 寄生组合继承
```js
// 寄生
function object(obj) {
    function F(){}
    F.prototype = obj;
    return new F();
}
// object是F实例的另一种表示方法
var obj = object(Person.prototype);
// obj实例（F实例）的原型继承了父类函数的原型
// 上述更像是原型链继承，只不过只继承了原型属性

// 组合
function Sub() {
    this.age = 100;
    Person.call(this); // 这个继承了父类构造函数的属性
} // 解决了组合式两次调用构造函数属性的特点

// 重点
Sub.prototype = obj;
console.log(Sub.prototype.constructor); // Person
obj.constructor = Sub; // 一定要修复实例
console.log(Sub.prototype.constructor); // Sub
var sub1 = new Sub();
// Sub实例就继承了构造函数属性，父类实例，object的函数属性
```

### es6 class继承
```js
class person {
    constructor() {
        this.kind="person"
    }
    eat(food) {
        console.log(this.name+" "+food);
    }
}
class student extends person{
    constructor(name){
        super();
        this.name=name;
    }
}
```


# 垃圾回收机制

JavaScript中的内存管理是自动执行的，而且是不可见的。我们创建基本类型、对象、函数.....所有这些都需要内存。

当不在需要某样东西时会发生什么？JavaScript引擎是如何发现并清理它？

### 可达性

JavaScript 中内存管理的主要概念是可达性。

简单地说，“可达性” 值就是那些以某种方式可访问或可用的值，它们被保证存储在内存中。

**1. 有一组基本的固有可达值，由于显而易见的原因无法删除。例如:**

- 本地函数的局部变量和参数
- 当前嵌套调用链上的其他函数的变量和参数
- 全局变量
- 还有一些其他的，内部的

**这些值称为根。**

**2. 如果引用或引用链可以从根访问任何其他值，则认为该值是可访问的。**

例如，如果局部变量中有对象，并且该对象具有引用另一个对象的属性，则该对象被视为**可达性**， 它引用的那些也是可以访问的，详细的例子如下。

JavaScript 引擎中有一个后台进程称为[垃圾回收器](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science))，它监视所有对象，并删除那些不可访问的对象。

### 一个简单的例子

下面是最简单的例子:

```javascript
// user 具有对象的引用
let user = {
  name: "John"
};
```

![img](https://image.fundebug.com/2019-03-25-01.png)

这里箭头表示一个对象引用。全局变量`“user”`引用对象 `{name:“John”}` (为了简洁起见，我们将其命名为**John**)。John 的 `“name”` 属性存储一个基本类型，因此它被绘制在对象中。

如果 `user` 的值被覆盖，则引用丢失:

```javascript
user = null;
```

![img](https://image.fundebug.com/2019-03-25-02.png)

现在 **John** 变成不可达的状态，没有办法访问它，没有对它的引用。垃圾回收器将丢弃 **John** 数据并释放内存。

### 两个引用

现在让我们假设我们将引用从 `user` 复制到 `admin`:

```javascript
// user具有对象的引用
let user = {
  name: "John"
};

let admin = user;
```

![img](https://image.fundebug.com/2019-03-25-03.png)

现在如果我们做同样的事情:

```javascript
user = null;
```

该对象仍然可以通过 `admin` 全局变量访问，所以它在内存中。如果我们也覆盖`admin`，那么它可以被释放。

### 相互关联的对象

现在来看一个更复杂的例子， family 对象：

```javascript
function marry (man, woman) {
  woman.husban = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
})
```

函数 `marry` 通过给两个对象彼此提供引用来“联姻”它们，并返回一个包含两个对象的新对象。

产生的内存结构:

![img](https://image.fundebug.com/2019-03-25-04.png)

到目前为止，所有对象都是可访问的。

现在让我们删除两个引用:

```javascript
delete family.father;
delete family.mother.husband;
```

![img](https://image.fundebug.com/2019-03-25-05.png)

仅仅删除这两个引用中的一个是不够的，因为所有对象仍然是可访问的。

但是如果我们把这两个都删除，那么我们可以看到 Jo**加粗文字**hn 不再有传入的引用:

![img](https://image.fundebug.com/2019-03-25-06.png)

输出引用无关紧要。只有传入的对象才能使对象可访问，因此，**John** 现在是不可访问的，并将从内存中删除所有不可访问的数据。

垃圾回收之后：

![img](https://image.fundebug.com/2019-03-25-07.png)

### 无法访问的数据块

有可能整个相互连接的对象变得不可访问并从内存中删除。

源对象与上面的相同。然后:

```javascript
family = null;
```

内存中的图片变成:

![img](https://image.fundebug.com/2019-03-25-08.png)

这个例子说明了可达性的概念是多么重要。

很明显，John和Ann仍然链接在一起，都有传入的引用。但这还不够。

“family”对象已经从根上断开了链接，不再有对它的引用，因此下面的整个块变得不可到达，并将被删除。

### 内部算法

基本的垃圾回收算法称为**“标记-清除”**，定期执行以下“垃圾回收”步骤:

- 垃圾回收器获取根并**“标记”**(记住)它们。
- 然后它访问并“标记”所有来自它们的引用。
- 然后它访问标记的对象并标记它们的引用。所有被访问的对象都被记住，以便以后不再访问同一个对象两次。
- 以此类推，直到有未访问的引用(可以从根访问)为止。
- 除标记的对象外，所有对象都被删除。

例如，对象结构如下:

![img](https://image.fundebug.com/2019-03-25-09.png)

我们可以清楚地看到右边有一个“不可到达的块”。现在让我们看看**“标记并清除”**垃圾回收器如何处理它。

**第一步标记根**

![img](https://image.fundebug.com/2019-03-25-10.png)

**然后标记他们的引用**

![img](https://image.fundebug.com/2019-03-25-11.png)

以及子孙代的引用:

现在进程中不能访问的对象被认为是不可访问的，将被删除:

![img](https://image.fundebug.com/2019-03-25-13.png)

这就是垃圾收集的工作原理。JavaScript引擎应用了许多优化，使其运行得更快，并且不影响执行。

一些优化:

- **分代回收**——对象分为两组:“新对象”和“旧对象”。许多对象出现，完成它们的工作并迅速结 ，它们很快就会被清理干净。那些活得足够久的对象，会变“老”，并且很少接受检查。
- **增量回收**——如果有很多对象，并且我们试图一次遍历并标记整个对象集，那么可能会花费一些时间，并在执行中会有一定的延迟。因此，引擎试图将垃圾回收分解为多个部分。然后，各个部分分别执行。这需要额外的标记来跟踪变化，这样有很多微小的延迟，而不是很大的延迟。
- **空闲时间收集**——垃圾回收器只在 CPU 空闲时运行，以减少对执行的可能影响。

# ES6新特性



![preview](https://pic1.zhimg.com/v2-351e22faceb2f3229d05fbf0c1488c8c_r.jpg)

![img](https://pic4.zhimg.com/80/v2-d4f9e77857a986c6b8e03c7f3d403aaf_720w.jpg)

![img](https://pic4.zhimg.com/80/v2-10b9eec704acebbcacdb29715a26fa2f_720w.jpg)

![img](https://pic4.zhimg.com/80/v2-f6bd39986e8da8059089e745cdd7c957_720w.jpg)

![img](https://pic3.zhimg.com/80/v2-6dab403d0038d8376af84a6901b0d1b6_720w.jpg)

![img](https://pic2.zhimg.com/80/v2-fdc092ed82dd4f1591b83e4eab97b27d_720w.jpg)

![img](https://pic1.zhimg.com/80/v2-1ac1084a64d586b87e99b49090fa6714_720w.jpg)

![img](https://pic2.zhimg.com/80/v2-28d136b9feb9cb6312f959518ae77729_720w.jpg)


# for...of 遍历对象
    我们都知道ES6引入了Iterator，只有提供了Iterator接口的数据类型才可以使用for...of来循环遍历，而对象并没有Iterator接口，那用for...of可以遍历对象吗？当然是可以的！

## 一、将对象转为数组然后使用for...of遍历
1. Object.keys()
    `Object.keys()`方法会返回一个由一个给定对象的自身可枚举属性组成的数组,数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。
```js
let obj = {
    '0': 1,
    '1': 2,
    '2': 3,
}
for(let key of Object.keys(obj)) {
    console.log(key);   // 0 1 2 
}
```
2. Object.values()
    `Object.values()`方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。
```js
let obj = {
    '0': 1,
    '1': 2,
    '2': 3,
}
for(let key of Object.keys(obj)) {
    console.log(key);   // 1 2 3 
}
```
3. Object.entries()
    `Object.entries()`方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。
```js
let obj = {
    '0': 1,
    '1': 2,
    '2': 3,
}
for(let [key, value] of Object.entries(obj)) {
    console.log(key, value);
}
// 0 1
// 1 2
// 2 3
```
    以上都是将对象转为数组才进行for...of遍历的，那如果不转为数组还可以吗？
    在次看for...of遍历的要求就是需要有Iterator接口，那么我们只要为对象提供Iterator接口呢？
## 二、为对象提供Iterator接口
    ES6提供了`Symbol.Iterator`属性，只要一个数据结构有这个属性，就会被视为有Iterator接口。
```js
let obj = {
    '0': 1,
    '1': 2,
    '2': 3,
}
obj[Symbol.iterator] = function(){
    let index = 0, self = this, keys = Object.keys(self);
    return {
        next(){
            if( index < keys.length ){
                return { 
                    value: self[keys[index++]]
                    , done: false
                };
            } else {
                return {
                    value: undefined
                    , done: true
                }
            }
        }
    };
};
for(let item of obj) {
    console.log(item);   // 1 2 3
}
```
> 仔细看会发现`Symbol.iterator`接口其实是一个 `Generator`函数,简化一下
```js
obj[Symbol.iterator] = function *(){
    let keys = Object.keys(this);
    for(let i = 0, l = keys.length; i < l; i++) {
        yield this[keys[i]];
    }
};
for(let item of obj) {
    console.log(item);   // 1 2 3
}
```
> 同时输出key和value
```js
obj[Symbol.iterator] = function *(){
    let keys = Object.keys(this);
    for(let i = 0, l = keys.length; i < l; i++) {
        yield {key : keys[i], value : this[keys[i]]};
    }
};
for(let item of obj) {
    console.log(item); 
}
// { key: '0', value: 1 }
// { key: '1', value: 2 }
// { key: '2', value: 3 }
// 这样还是不舒服，for...of的时候使用解构赋值
for(let {key, value} of obj) {
    console.log(key, value); 
}
// 0 1
// 1 2
// 2 3
```
OK~完美实现！

# TS的优势与ES6对比

https://www.jianshu.com/p/d2d15111f9d4  

# class 在 es5 和 es6 的区别
1. es5中是通过构造函数来实现class的，es6则可以使用class关键字。
2. es5可以变量提升，而es6 class不可以
3. class不可遍历在他原型上的属性和方法
4. class有static方法，只能通过类调用，不会出现在实例上，this指向类。

# 模块化
就是JS中将不同功能的代码封装在不同的文件中，再互相引用时不会发生命名冲突的一种思想。
## CommonJS
CommonJS是nodejs中使用的模块化规范。
使用require引用模块，module.exports\exports 导出模块。
## ES Module
ES6模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
二者都可以通过as来给要导出或者引入的变量重命名
## 对于CommonJS和ES6模块
CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。
