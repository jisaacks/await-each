// Behave like a normal `forEach` but if any cb
// returns a promise, wait for that promise to
// resolve before iterating the next item in the
// list.

// This allows each cb to _resolve_ before
// starting the next.

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = awaitEach;

function awaitEach(list, cb) {

  // This must return a promise
  return new Promise(function (done, fail) {

    // Get a copy of the list
    list = list.slice(0);

    // keep an array of all the responses from
    // the callbacks/promises
    var resp = [];

    function doNext(prev) {
      if (prev) {
        resp.push(prev);
      }

      if (list.length) {

        var item = list.shift();
        var ret = cb(item);

        if (!(ret instanceof Promise)) {
          ret = Promise.resolve(ret);
        }

        ret.then(doNext)["catch"](fail);
      } else {
        done(resp);
      }
    }

    doNext(undefined);
  });
}

module.exports = exports["default"];