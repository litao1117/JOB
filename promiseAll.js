// promise.all
Promise.prototype.all = function(promises) {
    let results = [];
    let promiseCount = 0;
    let promiseLength = promises.length;
    return new Promise(function(resolve, reject) {
        for(let val of promises) {
            Promise.resolve(val).then(function(res) {
                promiseCount++;
                // results[i] = res;
                results.push(res);
                if(promiseCount === promiseLength) {
                    return resolve(results);
                }
            }, function(err) {
                return reject(err);
            })
        }
    })
}
let promise1 = new Promise(function(resolve) {
    resolve(1);
  });
  let promise2 = new Promise(function(resolve) {
    resolve(2);
  });
  let promise3 = new Promise(function(resolve) {
    resolve(3);
  });
  
  let promiseAll = Promise.all([promise1, promise2, promise3]);
  promiseAll.then(function(res) {
    console.log(res);
  });

