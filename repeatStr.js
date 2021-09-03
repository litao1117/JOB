/**
 * 实现字符串重复的repeat函数
 */

//1
function repeat1(str, n) {
    return (new Array(n+1)).join(str);
}
console.log(repeat1("ab", 3));

//2 递归
function repeat2(str, n) {
    return (n>0)?str.concat(repeat2(str, --n)):""
}
console.log(repeat2("abc", 3));