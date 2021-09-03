function digit(n) {
    let s = n.toString();
    let arr = s.split('.');
    // let fl = arr[1].split('');
    // while(fl[fl.length-1] == 0) {
    //     fl.splice(fl.length-1,1);
    // } 
    arr[1].replace("/0+$/", "");
    let res = {};
    // res.val = parseInt(arr[0]+fl.join(''));
    res.val = parseInt(arr[0]+arr[1]);
    // res.digit = fl.length;
    res.digit = arr[1].length;
    return res;
}

// console.log(digit(1.23540000));

// function a(){}
// a.key = "123";
// a.s = "s"
// console.log(a);

let str = "   awe   ";
console.log(str);
str.trim();
str.
console.log(str);