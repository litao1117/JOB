// 'use strict';

// console.log(a);
/** */
// let n = 16;
// console.log(/^10*$/.test(n.toString(4)));
// console.log(n.toString(4));

function test(){
    var foo = 33;
    if (foo) {
       let foo = (foo + 55); // ReferenceError
    }
 }
//  test();
function go(n) {
    // n here is defined!
    console.log(n); // Object {a: [1,2,3]}
  
    for (let item of n.a) { // ReferenceError
      console.log(item);
    }
  }
  
  // go({a: [1, 2, 3]});

let str1 = "abcd";
let str2 = "abcdf";
// console.log(str1.includes(str2));
const s = [1,2]  
s[1] = 3;
// console.log(s);


const obj = {
    a: 1,
    b: "2",
    c: [ 1, 2, 3],
};
const fuc = ( obj) => {
    const props = { ... obj };
    props. a = "1";
    props. b = 2;
    props. c. push( 4);
    return props;
};
const obj2 = fuc( obj);
// console.log(obj2);
// console.log(obj);

// Function. prototype. a = () => {
//     console. log( 1);
// };
// Object. prototype. b = () => {
//     console. log( 2);
// };
// function A() {}
// const a = new A();


// console. log( 1);

// setTimeout(() => {
// console. log( 2);
// });

// setImmediate(() => {
// console. log( 3);
// });

// new Promise(( resolve) => {
// console. log( 4);

// resolve();

// console. log( 5);
// }). then(() => {
// console. log( 6);
// });

// Promise. resolve(). then(() => {
// console. log( 7);
// });

let ident = "14112420111132245";
// console.log(ident.substring(0,ident.length-4));
// let str = "****";


// console.log(0.100000000000000002);
// console.log({...[1,2,3]});
const time = "2017-09-11"
const regexp = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u
// 匹配：
// time.replace(regexp, "$<day>/$<month>/$<year>")
// console.log(time);
// console.log([1,[2,[3,4]]].flat());


// console.log(5);
// new Promise(resolve => {
//   console.log(1);
//   resolve();
// }).then(() => {
//    console.log(4);
// })
// setTimeout(() => console.log(2), 0);
// console.log(3);




// setTimeout(() => {
//     console.log(1);
// })
 
// const p1 = Promise.resolve(() => {
//     console.log(2);
// })
 
// const p2 = new Promise((resolve, reject) => {
//     console.log(3);
//     resolve();
// })
 
// Promise.race([p1, p2]).then(() => {
//     console.log(4);
// })
 
// Promise.all([p1, p2]).then(() => {
//     console.log(5);
// })
 
// console.log(6);


console.log(15 || 10);