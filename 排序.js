/**
 * 快排 O(NlogN)  O(logN)
 */

function quickSort(arr) {
  if(arr === null || arr.length === 0) {
    return [];
  }
  quick(arr, 0, arr.length-1);
  return arr;
}
function quick(arr, l, r) {
  if(l < r) {
    let partitionIndex = partition(arr, l, r);
    quick(arr, l, partitionIndex-1);
    quick(arr, partitionIndex+1, r);
  }
}
function partition(arr, l, r) {
  let pivot = l;
  let index = pivot + 1;
  for(let i = index; i <= r; i++) {
    if(arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index-1);
  return index-1;
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(quickSort([1,4,3,2,5,6,8,0]));

/**
 * 冒泡 O(n^2)
 */

/**
 * 选择 O(n^2)
 */

/**
 * 插入 O(n^2)
 */

/**
 * 归并 O(NlogN)
 */