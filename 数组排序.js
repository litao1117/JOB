/**
 * 将连续[123567]的分为一组（[[1,2,3],[5,6],[7]]），在转成[‘1->3’,’5->6’,’7’]?
 */

function trans(arr) {
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
      str += ("-"+arr[pos]);
    }
    res.push(str);
    pos++;
  }
  return res;
}

console.log(trans([1,2,3,5,6,7,9]));