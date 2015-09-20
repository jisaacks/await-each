
export function fulfill(value) {
  return new Promise(function (done) {
    setTimeout(function(){
      done(value);
    }, 100);
  });
}

export function reject(value) {
  return new Promise(function (done, fail) {
    setTimeout(function(){
      fail('oops');
    }, 100);
  });
}

export function noop(value) {
  return value;
}

export async function async(value) {
  return await fulfill(value);
}
