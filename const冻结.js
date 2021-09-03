/**
 * const声明的变量为复合类型时，其值仍然可以改变，可以使用Object.freeze冻结函数
 */

const constantize = obj => {
    Object.freeze(obj);
    Object.keys(obj).forEach(key => {
        if(typeof obj[key] === 'object') {
            constantize(obj[key])
        }
    })
}

for(let i = 0; i < 3; i++) {
    let i = 'abc';
    console.log(i);
}

var a = 0;
var a = 1;