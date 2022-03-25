/**
 * 将连续[123567]的分为一组（[[1,2,3],[5,6],[7]]），在转成[‘1->3’,’5->6’,’7’]?
 */

function trans(array) {
  let arr = tolArr(array);
  console.log(arr);
  let res = [];
  let pos = 0;
  let str, temp;
  while(pos < arr.length) {
    str = ''+arr[pos];
    temp = pos;
    while(pos < arr.length-1 && arr[pos]+1 === arr[pos+1]) {
      pos++;
    }
    if(pos > temp) {
      str += ("->"+arr[pos]);
    }
    res.push(str);
    pos++;
  }
  return res;
}

console.log(trans([1235679]));

function tolArr(arr) {
  let str = arr[0] + '';
  let res = [], pos = 0;
  while(pos < str.length) {
    let temp = [Number(str[pos])];
    while(pos < str.length - 1 && Number(str[pos]) + 1 === Number(str[pos+1])) {
      temp.push(Number(str[++pos]));
    }
    res.push(temp);
    temp = [];
    pos++;
  }
  return res;
}