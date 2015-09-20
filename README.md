#Await Each

Iterate async functions!

```javascript
awaitEach(values, async function(item) {
  return await doSomething();
}).then(function(responses) {
  console.log(responses);
});
```

Will wait until each callback is resolved before iterating to the next.

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

### Install

```shell
npm install await-each --save
```

### Why?

How is this any different than:


```javascript
values.forEach(async function(item) {
  await doSomething();
});
```

In the code above, each callback will wait for it's own `await` to resolve before continuing, but that wont stop the next callback from starting.

Consider this code:

```javascript
values.forEach(async function(item) {
  console.log('A');
  await doSomething();
  console.log('B');
});
```

Because each iteration does not wait for the previous the output would likely be something like:

> A A A B B B

Using `awaitEach`, each iteration waits for the prev to resolve before starting.

So converting the above code to:

```javascript
awaitEach(values, async function(item) {
  console.log('A');
  await doSomething();
  console.log('B');
});
```

Will guarantee the output will be:

> A B A B A B

