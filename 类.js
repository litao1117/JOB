/**
 * JS关于类的知识
 */

// ES5
function Person(info) {
    this.name = "zhangsan";
    this.sex = "man";
    // 实例方法
    this.eat = function() {
        console.log(this.name+"正在吃");
        console.log(`${info}`);
    }
}

// 类方法
Person.run = function() {
    console.log("run");
}

//原型链上面的属性和方法可以被多个实例共享
// 原型方法
Person.prototype.work = function() {
    console.log("work");
}

/*实例方法是通过实例化来调用的，静态是通过类名直接调用*/
let p = new Person();
// p.eat();
// p.work();
// Person.run();

/*   实现继承
 *   原型链继承与对象冒充继承的组合继
 * 对象冒充：无法继承原型链上面的属性和方法
 * 原型链继承：可以继承构造函数以及原型链上面的属性和方法，实例化子类的时候没法给父类传参
*/ 
function Son(info) {
    Person.call(this, info);
}
Son.prototype = new Person();
let s = new Son('son');
// s.eat()


// ES6
class Father{
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getName() {
        console.log(this.name);
    }
    setName(val) {
        this.name = val;
        console.log(this.name);
    }
    // 静态方法
    static work() {
        console.log(`${this.name} work`);
    }
}

// 继承
class Son2 extends Father{
    constructor(name, age, sex) {
        super(name, age);
        this.sex = sex;
    } 
    getSex(){
        return this.sex
    }
}



// 实例.__proto__ = 原型    类.prototype = 原型   原型.constructor = 类
