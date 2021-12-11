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
 * splice
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
// console.log(removeDuplicates2([1,1,1,2,3]));
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
// console.log(mergeArr([1,4,7], 3, [2,3,6], 3));
/**
 * 两个超大的数相加
 */
a = "12346";
b = "2453";
function addBigNum(a, b) {
    let arrA = a.split("").reverse();
    let arrB = b.split("").reverse();
    let aLen = arrA.length;
    let bLen = arrB.length;
    let shortArr, shortLen, longArr, longLen;
    if(aLen < bLen) {
        shortArr = arrA;
        shortLen = aLen;
        longLen = bLen;
        longArr = arrB;
    } else {
        shortArr = arrB;
        shortLen = bLen;
        longLen = aLen;
        longArr = arrA;
    }
    let result = [];
    let add = 0;
    for(let i = 0; i < shortLen; i++) {
        let temp = (parseInt(arrA[i])+parseInt(arrB[i])+add)%10;
        result.push(temp);
        add = Math.floor((parseInt(arrA[i])+parseInt(arrB[i])+add)/10);
    }
    if(shortLen === longLen) {
        result.push(add);
    } else {
        for(let i = shortLen; i < longLen; i++) {
            if(i === longLen-1) {
                result.push(parseInt(longArr[i])+add)
            } else {
                let temp = (parseInt(longArr[i])+add)%10;
                result.push(temp);
                add = Math.floor((parseInt(longArr[i])+add)/10);
            }
        }
    }
    return result.reverse().join("");
}
// console.log(addBigNum(a,b));

/**
 * 1-400 所有数字中包含的1的个数
 */

function oneCount() {
    let num = 0;
    for(let i = 1; i <= 400; i++) {
        num += String(i).length-String(i).replace(/1/g, '').length;
    }
    return num;
}
// console.log(oneCount());


// console.log(String(3).match(/1/g));

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
            while(res.length>0&&res[res.length-1]>temp) {
                sta.push(res.pop());               
                j++;
            }
            // 将小的这个数推入栈中
            res.push(temp);
            // 将原来的数再次填入栈中
            while(j-->0) {
                res.push(sta.pop());
            }
        } else {
            res.push(temp);
        }
    }
    return res;
}

// console.log(StackSort([8,4,5,7,2,6]));