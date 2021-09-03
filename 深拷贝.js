/**
 * 深拷贝
 * @param {Object} obj
 * @return {Object}
 */

const obj = {
    name: '李涛',
    surname: '隔壁老王',
    social: {
        url: 'litaoya',
        wx: 'litao'
    },
    s: function() {

    }
}

// 1
const obj2 = JSON.parse(JSON.stringify(obj));
console.log(obj);
obj2.social.url = 'baidu.com';
console.log(obj2);


// 2
// function deepClone(object) {
//     var clone = {};
//     for(var key in object) {
//         var value = object[key];
//         if(typeof(value) !== 'object') {
//             clone[key] = value;
//         } else {
//             clone[key] = deepClone(value)
//         }
//     }
//     return clone;
// }
//实现深拷贝函数
function deepClone(data) {
    const type = judgeType(data);
    let obj = null;
    if (type == 'array') {
        obj = [];
        for (let i = 0; i < data.length; i++) {
            obj.push(deepClone(data[i]));
        }
    } else if (type == 'object') {
        obj = {}
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                obj[key] = deepClone(data[key]);
            }
        }
    } else {
        return data;
    }
    return obj;
}

function judgeType(obj) {
    // tostring会返回对应不同的标签的构造函数
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
    };
    return map[toString.call(obj)];
}
const test = {
    name: 'a',
    date: [1,2,3]
};
// console.log(deepClone(test))
// test.date[0] = 6;
// console.log(test);  

let a = [];
// console.log(Object.prototype.toString.call(a));


// 
function cdeep(data) {
    let obj = null;
    if(Array.isArray(data)) {
        obj = [];
        for(let item of data) {
            obj.push(cdeep(item));
        }
    } else if(typeof data === 'object') {
        obj = {};
        for(let key in data) {
            obj[key] = cdeep(data[key]);
        }
    } else {
        return data;
    }
    return obj;
}


// 循环方式
function cloneDeep(source) {
    if(!(typeof source === 'object' && source !== null)) {
        return source;
    }
    const root = Array.isArray(source) ? [] : {};
    // 定义一个栈
    const loopList = [{
        parent: root,
        key: undefined,
        data: source,
    }];
    while(loopList.length > 0) {
        // 深度优先
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;
        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if(typeof key !== undefined) {
            res = parent[key] = Array.isArray(data) ? [] : {};
        }
        for(let [childKey, value] of Object.entries(data)) {
            if(typeof value === 'object' && value !== null && !(value instanceof RegExp)) {
                loopList.push({
                    parent: res,
                    key: childKey,
                    data: value
                });
            } else {
                res[childKey] = value;
            }
        }
    }
    return root;
}