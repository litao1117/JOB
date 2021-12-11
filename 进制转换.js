/**
 * 实现10进制数转为2-9进制数
 * toBase(100, 2)  --> 1100100
 */

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
function toBaseSimple(n, m) {
    return n.toString(m);
}

function toBase(n, m) {
    if(n == 0) return n;
    if(!Number.isInteger(n)) return;
    let res = '', rate, i;
    if(n < 0) {
        res += '-';
        n = Math.abs(n);
    }
    // 循环获取最高幂数
    for(i = 0; i < n; i++) {
        if(Math.pow(m, i) <= n && Math.pow(m, i+1) > n) break;
    }
    // 根据最高幂数，获取结果字符
    while(i >= 0) {
        // 获取最高幂数的倍数
        rate = Math.floor(n / Math.pow(m, i));
        res += digits[rate];
        n -= rate * Math.pow(m, i);
        i--;
    }
    return res;
}




// console.log(toBase(100, 16));

/**
 * 把一个数按照传参进制转换为十进制
 */

function parse_int(n, m) {
    n = (n + '').toUpperCase();
    let res = 0, abs = 1, len = n.length, i;
    if(n[0] === '-') {
        abs = -1;
        n = n.substring(1);
    }
    for(i = len - 1; i >= 0; i--) {
        res += digits.indexOf(n[len-1-i]) * Math.pow(m, i);
    }
    return abs * res;
}