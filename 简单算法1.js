/**
 * 1.两数之和
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 */

function twoSum(nums, target) {
    let temp = [];
    for(let i = 0; i < nums.length; i++) {
        let dif = target - nums[i];
        if(temp[dif] !== undefined) {
            return [temp[dif], i];
        }
        temp[nums[i]] = i;
    }
}

/**
 * 2.整数反转
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
 */

function reverse(x) {
    let sign = Math.sign(x);
    let res = (Math.abs(x) + '').split('').reverse().join('') * sign;
    if(res > Math.pow(2,31)-1 || res < Math.pow(2,31) * -1)
        res = 0;
    return res;
}
// console.log(reverse(-123));

/**
 * 3.回文
 * 二分法
 * 翻转法
 */

function isPalindrome1(x) {
    if(x < 0) return false;
    let flag = true;
    x = x.toString();
    for(let i = 0, len = x.length; i < len/2; i++) {
        if(x[i] !== x[len-1-i]) {
            flag = false;
            break;
        }
    }
    return flag;
}

function isPalindrome2(x) {
    let s = 0;
    let x1 = x;
    while(x1 > 0) {
        s = s * 10 + x1 % 10;
        x1 = parseInt(x1 / 10);
    }
    return s == x;
}

/**
 * 4.两个有序链表合并为一个新的有序链表
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

function mergeTwoLists(l1, l2) {
    let prevHead = new ListNode(-1);
    let prevNode = prevHead;
    while(l1 !== null && l2 !== null) {
        if(l1.val <= l2.val) {
            prevNode.next = l1;
            l1 = l1.next;
        } else {
            prevNode.next = l2;
            l2 = l2.next;
        }
        prevNode = prevNode.next;
    }
    prevNode.next == l1 ? l1 : l2;
    return prevHead.next;
}

/**
 * 5.删除排序数组中的重复项,返回新数组长度，你不需要考虑数组中超出新长度后面的元素。
 * splice[1,2,2,2,3,3,4]
 * 
 */

function removeDuplicates1(nums) {
    let cur = nums[0];
    for(let i = 1; i < nums.length;) {
        if(nums[i] === cur) {
            nums.splice(i, 1);
        } else {
            cur = nums[i++];
        }
    }
    return nums.length;
}

function removeDuplicates2(nums) {
    let len = 1;
    for(let i = 1; i < nums.length; i++) {
        if(nums[i] != nums[i-1]) 
            nums[len++] = nums[i];
    }
    return len;
}
// console.log(removeDuplicates2([1,2,1,3,1]));
/**
 * 有序数组合并
 */

function mergeArr(nums1, m, nums2, n) {
    let index1 = m-1;
    let index2 = n-1;
    let tail = m+n-1;
    while(index2 >= 0) {
        if(nums1[index1] > nums2[index2]) {
            nums1[tail] = nums1[index1];
            index1--;
            tail--
        } else {
            nums1[tail] = nums2[index2];
            index2--;
            tail--;
        }
    }
    return nums1;
}
// console.log(mergeArr([7,8,9], 3, [2,3,6], 3));
/**
 * 两个超大的数相加
 */
a = "125346";
b = "246853";
function addBigNum(a, b) {
    let arrA = a.split("").reverse();
    let arrB = b.split("").reverse();
    let aLen = arrA.length;
    let bLen = arrB.length;
    let shortArr, shortLen, longArr, longLen;
    // 短数组用0补全
    if(aLen < bLen) {
        shortArr = arrA;
        shortLen = aLen;
        longLen = bLen;
        longArr = arrB;
        for (let i = aLen; i < bLen; i++) {
            arrA.push(0);
        }
    } else {
        shortArr = arrB;
        shortLen = bLen;
        longLen = aLen;
        longArr = arrA;
        for (let i = bLen; i < aLen; i++) {
            arrB.push(0);
        }
    }
    let result = [];
    let add = 0;
    for(let i = 0; i < arrA.length; i++) {
        let temp = (parseInt(arrA[i])+parseInt(arrB[i])+add)%10;
        result.push(temp);
        add = Math.floor((parseInt(arrA[i])+parseInt(arrB[i])+add)/10);
    }
    // if(s hortLen === longLen) {
    if (add > 0) {
        result.push(add);
    }
    // } else {
    //     for(let i = shortLen; i < longLen; i++) {
    //         if(i === longLen-1) {
    //             result.push(parseInt(longArr[i])+add)
    //         } else {
    //             let temp = (parseInt(longArr[i])+add)%10;
    //             result.push(temp);
    //             add = Math.floor((parseInt(longArr[i])+add)/10);
    //         }
    //     }
    // }
    return result.reverse().join("");
}
// console.log(addBigNum(a,b));

/**
 * 1-400 所有数字中包含的1的个数
 */

function oneCount() {
    let num = 0;
    for(let i = 1; i <= 400; i++) {
        // num += String(i).length-String(i).replace(/1/g, '').length;
        let arr = String(i).match(/1/g) || [];
        num += arr.length;
    }
    return num;
}
// console.log(oneCount());


// console.log(String(3112).match(/1/g));

/**
 * 已知数组 a=[1,[2,[3,[4,null]]]], 实现数组 b=[4,[3,[2,[1,null]]]] ，考虑n级嵌套的情况
 */

function atob(arr) {
    const reverse = function(arr, temp) {
        if(arr[1] == null) return [arr[0], temp];
        temp = temp ? [arr[0], temp] : [arr[0], null];
        return reverse(arr[1], temp);
    }
    return reverse(arr);
}
// console.log(atob([1,[2,[3,[4,null]]]]));
/**
 * 对象数组去重
 */

const list = [
    {id: 1, name: 2},
    {id: 2, name: 2},
    {id: 3, name: 2},
    {id: 1, name: 2},
]
const resule = list.reduce((acc, cur) => {
    let items = acc.map(item => item.id);
    return items.includes(cur.id) ? acc : [...acc, cur];
}, [])

// console.log(result);

/**
 * 两个数组合并成一个数组
 * 请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，
 * 合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。
 */

let a1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
let a2 = ['A', 'B', 'C', 'D'].map(item => {
    return item+3;
});
let res = [...a1, ...a2].sort().map(item => {
    if(item.includes('3')) {
        return item.split('')[0];
    }
    return item;
})
// console.log(res);


/**
 * 千分位分割符
 */

function splitStr(str, range = 3) {
    const [left, right] = (str+'').split('.');
    const arr = left.split('').reverse();
    let res = [];
    for(let i = 0; i < arr.length; i+=range) {
        res.push(arr.slice(i, i+range).reverse().join(''));
    }
    console.log(res);
    return right?`${res.reverse().join(',')}.${right}`:res.reverse().join(',');
}

// console.log(splitStr(1234567.45));

// 利用栈进行排序
function StackSort(sta) {
    let len = sta.length;
    let res = [];
    let j = 0; // 记录出栈次数
    while(sta.length > 0) {
        let temp = sta.pop();
        if(res.length != 0) {
            // 将较大的数弹出栈
            while(res.length > 0 && res[res.length-1] > temp) {
                sta.push(res.pop());               
                j++;
            }
            // 将小的这个数推入栈中
            res.push(temp);
            // 将原来的数再次填入栈中
            while(j-- > 0) {
                res.push(sta.pop());
            }
        } else {
            res.push(temp);
        }
    }
    return res;
}

// console.log(StackSort([8,4,5,7,2,6]));


// 实现lazyMan类
class LazyManClass {
    constructor(name) {
        this.name = name;
        this.queue = [];
        console.log(`Hi, I am ${name}`);
        setTimeout(() => {
            this.next();
        }, 0);
    }
    next() {
        const fn = this.queue.shift();
        fn && fn();
    }
    sleepFirst(time) {
        const fn = () => {
            setTimeout(() => {
                console.log(`等待了${time}s`)
                this.next();
            }, time*1000)
        }
        this.queue.unshift(fn);
        return this;
    }
    sleep(time) {
        const fn = () => {
            setTimeout(() => {
                console.log(`等待了${time}s`)
                this.next();
            }, time*1000)
        }
        this.queue.push(fn);
        return this;
    }
    eat(food) {
        const fn = () => {
            console.log(`I am eating ${food}`)
            this.next();
        }
        this.queue.push(fn);
        return this;
    }
}
function lazyMan(name) {
    return new LazyManClass(name);
}

// lazyMan('Tom').eat('lunch').eat('dinner').sleepFirst(3).sleep(5).eat('food');


// 求两个数组的交集
function intersection(arr1, arr2) {
    return arr1.filter((item) => {
        return arr2.includes(item);
    })
}

// 旋转一维数组
function rotate(arr, k) {
    const len = arr.length;
    const step = k % len;
    return arr.slice(-step).concat(arr.slice(0, len-step));
}
// console.log(rotate([1,2,3,4,5,6], 7));

// 打印1-10000之间所有的对称数
[...Array(10000).keys()].filter(x => {
    return x.toString().length > 1 && x === Number(x.toString().split('').reverse().join(''));
})

// 给定两个大小为m和n的有序数组，找出这两个数组的中位数，时间复杂度O(log(n+m))
function findMedianSortedArrays(nums1, nums2) {
    const len1 = nums1.length;
    const len2 = nums2.length;
    const median = Math.ceil((len1 + len2 + 1) / 2);
    const res = [];
    let i = 0, j = 0;
    for(let k = 0; k < median; k++) {
        if(i < len1 && j < len2) {
            if(nums1[i] < nums2[j]) {
                res[i + j] = nums1[i++];
            } else {
                res[i + j] = nums2[j++];
            }
        } else if(i < len1) {
            res[i + j] = nums1[i++];
        } else if(j < len2) {
            res[i + j] = nums2[j++];
        }
    }
    const isOddLen = (len1 + len2) % 2 === 0;
    if(isOddLen) {
        return (res[median - 1] + res[median - 2]) / 2;
    } else {
        return res[median - 1];
    }
}
// console.log(findMedianSortedArrays([1,3], [2]));

// 给你一个数组，可以对数组任意区间反转，也可以不反转，求最大连续和
// 1。暴力
// function maxContinueSum(arr) {
//     let ans = 0;
//     let len = arr.length;
//     let sum = [arr[0]]; // 前缀和
//     let mx = [arr[0]];  // 不反转最大连续和
//     let mval = [0];
//     for(let j = 1; j < len; j++) {
//         sum[j] = sum[j-1] + arr[j];
//     }
//     for(let i = 1, s = arr[0]; i < arr.length; i++) {
//         s += arr[i];
//         if(s < 0) s = 0;
//         mx[i] = Math.max(mx[i-1], s)
//         mval[i] = Math.max(mval[i-1], mx[i] - sum[i]);
//         ans = Math.max(ans, sum[i] + mval[i-1]);
//     }
//     return ans;
// }
// console.log(maxContinueSum([-1,3,-5,2,-1,3]));


// 最长回文子串：中心扩展
// 1
function longestPalindrome(s) {
    if(!s || s.length < 2) return s;
    let res = '';
    function centerExpand(i, j) {
        while(i >= 0 && j < s.length && s[i] == s[j]) {
            i--;
            j++;
            if(j-i-1 > res.length) {
                res = s.slice(i+1, j);
            }
        }
    }
    for(let i = 0; i < s.length; i++) {
        centerExpand(i, i);
        centerExpand(i, i+1);
    }
    return res;
}

// 多层拍平数组
function flatArray(arr, num = 1) {
    if (!Number(num) || Number(num) < 0) {
        return arr;
    }
    let newArr = [];
    arr.forEach((item) => {
        if (Array.isArray(item)) {
            newArr = newArr.concat(flatArray(item, --num));
        } else {
            newArr.push(item);
        }
    })
    return newArr;
}
// console.log(flatArray([1,2,[4,6,[7, 8]]], 2));

// 矩阵旋转90度
function rotate90(matrix) {
    const n = matrix.length;
    for (let i = 0; i < Math.floor(n / 2); i++) {
        for(let j = 0; j < Math.floor((n+1)/2); j++) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[n-j-1][i];
            matrix[n-j-1][i] = matrix[n-i-1][n-j-1];
            matrix[n-i-1][n-j-1] = matrix[j][n-i-1];
            matrix[j][n-i-1] = temp;
        }
    }
    return matrix;
}
function rotate902(matrix) {
    const n = matrix.length;
    const matrix_new = new Array(n).fill(0).map(() => new Array(n).fill(0));
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            matrix_new[j][n-i-1] = matrix[i][j]
        }
    }
    return matrix_new;
}

// 两个增序数组是否是包含关系 要求O(n)
function includes(arr1, arr2) {
    if (arr1.length === 0) return false;
    let n = arr2.length;
    let l1 = 0, r1 = n - 1, l2 = 0, r2 = n - 1;
    for(let i = 0; i < arr1.length; i++) {
        if (l1 > r1) {
            return true;
        }
        if (arr1[l1] === arr2[l2] && arr1[r1] === arr2[r2]) {
            l1++;
            l2++;
            r1--;
            r2--;
        } else {
            l1++;
            r1++;
        }
    }
    return false;
}
// console.log(includes([1, 2, 3, 4, 5, 6, 7, 8], [2,4,5]))

// 最长无重复字符串：滑动窗口
function maxNoRepeat(str) {
    let r = -1, ans = 0;
    let set = new Set();
    for(let i = 0, n = str.length; i < n; i++) {
        if (i !== 0) {
            set.delete(str[i-1])
        }
        while(r + 1 < n && !set.has(str[r + 1])) {
            set.add(str[r + 1])
            ++r
        }
        ans = Math.max(ans, r - i + 1)
    }
    return ans;
}

// 二分搜索
function BinarySearch(arr, target) {
    let right = arr.length - 1;
    let left = 0;
    let mid = Math.floor((left + right) / 2);
    while(left < right) {
        if (arr[mid] > target) {
            right = mid;
        } else if (arr[mid] < target) {
            left = mid;
        } else {
            return mid;
        }
        mid = Math.floor((left + right) / 2);
    }
    return -1;
}

// console.log(BinarySearch([1,3,4,5,6,8,9,12,15], 4));