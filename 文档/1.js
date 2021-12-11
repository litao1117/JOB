/**
 * 快速排序  [0,3,1,6,2,4] 0 1 3 2
 */

function quickSort(arr) {
    let left = 0, right = arr.length - 1;
    quick(arr, left, right);
    return arr;
}

function quick(arr, l, r) {
    if(l > r) {
        let pri = partition(arr, l, r);
        quick(arr, l, pri-1);
        quick(arr, pri+1, r);
    }
}

function partition(arr, l, r) {
    let privot = l;
    let index = privot + 1;
    for(let i = index; i < r; i++) {
        if(arr[privot] > arr[i]) {
            swap(arr, index, i);
            index++;
        }
    }
    swap(arr, privot, index-1);
    return index-1;
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}


/**
 * 
 */
// 1 2
function fbnq(n) {
    if(n <= 2) {
        return n;
    } else {
        return fbnq(n-1) + fbnq(n-2);
    }
}

function fb2(n) {
    let a = 1, b = 2, res;
    for(let i = 3; i <= n; i++) {
        res = a + b;
        a = b;
        b = res;
    }
    return res;
}

console.log(fb2(5));