/**
 * 实现一个Promise.retry 函数，使得某个函数执行得结果如果是失败请求一定的次数之后再reject，
 * 失败后间隔某个时间段之后重试，尝试超过一定次数才真正的 reject
 */

function Retry(fn, times, delay) {
    return new Promise((resolve, reject) => {
        // 记录次数
        let index = 0;
        let action = function() {
            fn().then(res => {
                index++;
                console.log("第"+index +"次请求成功");
            }).catch(err => {
                // 如果次数为0，直接reject 
                if(times == 0) {
                    reject(err);
                } else {
                    // 否则次数减一，设置delay之后重试
                    times--;
                    index++;
                    console.log("第"+index +"次请求失败");
                    setTimeout(() => {
                        action();
                    }, delay)
                }
            }) 
        }
        action(resolve, reject)
    })
}

function getRandom(){
    return new Promise((resolve, reject) => {
        let data = Math.random() * 10;
        if(data > 10){
            resolve(data)
        }else{
            reject(data)
        }
    })
}

Retry(getRandom, 5, 1000);