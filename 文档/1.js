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
var result = [];

a = 3;

var total = 0;

function foo(a) {

 var i = 0;

 for (; i < 3; i = i + 1) {

   result[i] = function() {

     total += i * a;

     console.log(total);

   };

 }

}

foo(1);
result[0]();
result[1]();
result[2]();