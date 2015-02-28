# koa-autoroute
  A simple wrap for [koa-route](https://www.npmjs.com/package/koa-route) that will make your life easier :)

## API
```js
autoroute(apiUrlRoot, handlerFileRoot)
```
  
## Example
```js
var koa = require('koa'),
    autoroute = require('koa-autoroute');

var app = koa();

// Setup autoroute.
// For example 'GET /api/foo/bar/test/xxx' will be route to handler.get.xxx or handler.all.xxx if any of them exists  
// where handler = require(__dirname + 'api/foo/bar/test.js')
app.use(autoroute('/api/', __dirname + '/api'));

// Yep, you can use it just the same way as koa-route.
app.use(autoroute.get('/test', function *() {
    this.body = 'haha';
}));

console.log('Test server is now listening on port 20080');
app.listen(20080);
```
