// Behave like a normal `forEach` but if any cb 
// returns a promise, wait for that promise to 
// resolve before iterating the next item in the 
// list.

// This allows each cb to _resolve_ before
// starting the next.

export default function awaitEach(list, cb) {
  
  // This must return a promise
  return new Promise(function(done, fail) {
    
    // Get a copy of the list
    list = list.slice(0);
    
    // keep an array of all the responses from
    // the callbacks/promises
    let resp = [];

    function doNext(prev) {
      if (prev) {
        resp.push(prev);
      }
      
      if (list.length) {
        
        let item = list.shift();
        let ret = cb(item);
        
        if (!('then' in Object(ret))) {
          ret = Promise.resolve(ret);
        }
        
        ret.then(doNext, fail);
      
      } else {
        done(resp);
      }
    }

    doNext(undefined);
  });
}
