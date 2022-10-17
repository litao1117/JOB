function hanoi( n ) {
    // write code here
    if(n === 1) {
        return 1;
    } else {
        return 2*hanoi(Math.floor(n/2))+dg(n-Math.floor(n/2));
    }
}
function dg(n) {
    return Math.pow(2,n)-1;
}

console.log(hanoi(4));
// console.log(Math.ceil(5/2));
// return hanoi(n/2)+hanoi(n-n/2)+hanoi(n/2)





function nthMax3( nums ) {
    // write code here
    let min,mid,max;
    for(let i = 0; i < nums.length; i++) {
        let num = nums[i];
        if(num === max || num === mid) continue;
        if (max === undefined || num > max) {
            //exchange
            [min, mid, max] = [mid, max, num];
        } else if (mid === undefined || num > mid) {
            [min, mid] = [mid, num];
        } else if (min === undefined || num > min) {
            min = num;
        }
    }
    if(min == undefined || mid == undefined) {
        return max;
    }
    return min;
}

console.log(nthMax3([3,2]));










