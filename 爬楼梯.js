/**
 * 爬楼梯算法
 */

// 递归1  时间复杂度过高
function climbStairs1(n) {
    if(n <= 0) {
        return 0;
    }
    if(n <= 2) {
        return n;
    }
    return climbStairs1(n-2) + climbStairs1(n-1);
}
console.log(climbStairs1(4));

// 递归2 
var temp = [];
function climbStairs2(n) {
    if(n <= 0) {
        return 0;
    }
    if(n <= 2) {
        return n;
    }
    if(temp[n]) {
        return temp[n];
    }
    temp[n] = climbStairs2(n-2)+climbStairs2(n-1);
    return temp[n];
}
console.log(climbStairs2(4));

// dp
function climbStairs3(n) {
    if(n <= 2) {
        return n;
    }
    var res = [0,1,2];
    for(var i = 3; i <= n; i++) {
        res[i] = res[i-1]+res[i-2];
    }
    return res[n];
}
console.log(climbStairs3(5));


// dp  优化空间复杂度
function climbStairs4(n) {
    if(n <= 2) {
        return n;
    }
    var a = 1;
    var b = 2;
    var res;
    for(var i = 3; i <= n; i++) {
        res = a + b;
        a = b;
        b = res;
    }
    return res;
}
console.log(climbStairs4(5));