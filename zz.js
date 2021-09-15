function getCount(num) {
    if(num < 10) return -1;
    let count = 0;
    while(num != 0) {
        if(num >= 10) {
            let cn = num - 6;
            let a = Math.floor(cn / 4);
            let b = cn % 4;
            count += a;
            if(b !== 0) {
                num = b + 6;
            }
        } else if(num >= 6) {
            num -= 3;
            count++;
        } else if(num >= 3) {
            num -= 2;
            count++;
        } else {
            num -= 1;
            count++;
        }
    }
    return count;
}
// console.log(getCount(16));

function happyTriangle( length ) {
    // write code here
    length.sort((a, b) => a - b);
    const len = length.length;
    console.log(length);
    let res = 0;
    let k = 1;
    for(let i = 0; i < len;) {
        while(k < len) {
            for(let j = k + 1; j < len; j++) {
                if(length[j] < length[i] + length[k] && (length[k]!=length[i] || length[k]!=length[j]) && Math.pow(length[j], 2) != Math.pow(length[i], 2) + Math.pow(length[k], 2)) {
                    res++;
                } else {
                    length[j] < length[i] + length[k+1]
                }
            }
            ++k;
        }
        ++i;
        k = i+1;
    }
    return res;
}
console.log(happyTriangle([5,3,4,6,6,1]));