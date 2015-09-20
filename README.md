#Await Each
====

Iterate async functions!

```javascript
awaitEach(values, async function(item) {
  return await doSomething();
}).then(function(responses) {
  console.log(responses);
});
```

Will wait until each callback is complete before iterating to the next.

No dependency on `async` functions!

Can also be used with just promises:

```javascript
awaitEach(values, function(item) {
  return Promise.resolve(item);
}).then(function(responses) {
  console.log(responses);
});
```

Mixin with underscore:

```javascript
_.mixin({awaitEach});
```
