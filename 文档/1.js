// let str = 'hello-world';
// let str2 = str.replace(/-([a-z])/g, function(k, v) {
//     console.log(k, v);
//     return v.toUpperCase();
// })
// console.log(str2);

// let promise = new Promise((res, rej) => {
//     console.log(1);
//     setTimeout(() => {
//         console.log('time start');
//         res('ok');
//         console.log('time end');
//     })
//     console.log(2);
// })
// promise.then(res => {
//     console.log(res);
// })
// console.log(3);
// function Foo() {
//     Foo.a = function (params) {
//         console.log(1)
//     }  
//     this.a = function (params) {
//         console.log(2)
//     }
// }
// Foo.prototype.a = function (params) {
//     console.log(3)
// }
// Foo.a = function (params) {
//     console.log(4)
// }
// Foo.a();
// let obj = new Foo();
// obj.a();
// Foo.a();

// var a = 1;
// console.log(a)
// var a = 2;

// obj = {};
// num = 1;
// function a(a) {
//     a.b = 1;
// }
// function b(num) {
//     num = 2;
// }
// a(obj);
// b(num);
// console.log(num, obj);

// async function async1(){
//     console.log('async1 start')	//2  
//     // 执行async2函数的 setTimeout
//     await async2()
//     // setTimeout(function(){
//     //     // 等上面执行完在执行
//     //     console.log('setTimeout1')//8
//     // },0)
//     console.log('async1 end');
// }		
// async function async2(){
//     // setTimeout(function(){
//     //     console.log('setTimeout2')//7
//     // },0)
//     console.log('async2')
// }
// console.log('script start')//1    //执行同步代码
// setTimeout(function(){
//     // 最后执行setTimeout
//         console.log('setTimeout3')//6
//     },0)
// async1()  			//调用 
//                         //执行先执行同步 输出2

//                     // 调用
//                             // 执行异步setTimeout
// new Promise(function(r,j){
//     console.log('Promise1')//3  //按照代码顺序
//     r()
// }).then(function(){
//     // 等主线任务完成在执行
//     console.log('Promise2')//5

// })
// console.log('script end')//4

// console.log('3452323'.match(/1/g))

// var result = [];
// a = 3;
// var total = 0;
// function foo(a) {
//  var i = 0;
//  for (; i < 3; i = i + 1) {
//    result[i] = function() {
//      total += i * a;
//      console.log(i);
//      console.log(a);
//      console.log(total);
//    };
//  }
// }
// foo(1);
// result[0](); //3
// result[1](); //6
// result[2](); //9

// Object.prototype.a = 'object'; 
// Function.prototype.a='function'; 
// function Person(){}; 
// var child = new Person();
// console.log(Person.a);
// console.log(child.a);

function A() {
    return {b: 1};
}

let a = new A();
console.log(a);

// 面试官您好，我叫李涛，来自山西，毕业于太原理工大学软件工程专业，在校期间，在接触到前端时，对前端产生了兴趣，所以自学前端。
// 我在xxx,xxx,xxx有过工作经历，岗位都是前端开发。