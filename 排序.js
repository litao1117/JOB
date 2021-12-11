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

function par(arr, l, r) {
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

console.log(quickSort([1,4,3,2,5,6,8,0]));

/**
 * 冒泡 O(n^2)
 */

function BubbleSort(arr) {
  if(arr == null || arr.length === 0) return [];
  for(let i = arr.length - 1; i > 0; i--) {
    for(let j = 0; j < i; j++) {
      if(arr[j] > arr[j+1]) {
        swap(arr, j, j+1);
      }
    }
  }
  return arr;
}


/**
 * 选择 O(n^2)
 */

function SelectionSort(arr) {
  if(arr == null || arr.length === 0) return [];
  for(let i = 0, len = arr.length; i < len - 1; i++) {
    let minIndex = i;
    for(let j = i + 1; j < len; j++) {
      minIndex = arr[j] < arr[minIndex] ? j : minIndex;
    }
    swap(arr, i, minIndex);
  }
}
/**
 * 插入 O(n^2)
 */

function InsertSort(arr) {
  if(arr == null || arr.length === 0) return [];
  for(let i = 1, len = arr.length; i < len; i++) {
    for(let j = i - 1; j >= 0; j--) {
      if(arr[j] > arr[j+1]) swap(arr, j, j+1);
    }
  }
}

/**
 * 归并 O(NlogN)
 */