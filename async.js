/**
 * async原理，将generator函数作为参数放入run函数中
 */



function run(genF) {
  return new Promise((resolve, reject) => {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then((v) => {
        step(() => gen.next(v));
      }, (e) => {
        step(() => gen.throw(e));
      })
    }
    step(() => gen.next(undefined)) 
  })
}

