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

console.log(StackSort([8,4,5,7,2,6]));
