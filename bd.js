
/**
 * 
获取 url 中的参数
1. 指定参数名称，返回该参数的值 或者 空字符串
3. 如果存在多个同名参数，则返回数组
4. 不支持URLSearchParams方法

http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe   key
[ket=1, key=2,...,test=4#hehe]
 */

function getUrlQuery(url, name) {
    const arr = url.split('?')[1].split('&');
    arr[arr.length-1] = arr[arr.length-1].split('#')[0];
    const resObj = new Map();
    console.log(arr);
    arr.forEach(item => {
        const itemArr = item.split('=');
        if(resObj.has(itemArr[0])) {
            let value = [];
            const oriValue = resObj.get(itemArr[0]);
            if(Array.isArray(oriValue)) {
                value = oriValue;
                value.push(itemArr[1]);
            } else {
                value.push(oriValue, itemArr[1]);
            }
            resObj.set(itemArr[0], value);
        } else {
            resObj.set(itemArr[0], itemArr[1]);
        }
    });
    if(name) {
        return resObj.has(name) ? resObj.get(name) : '';
    } else {
        return resObj;
    }
}
const output = getUrlQuery('http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe');
console.log(output);