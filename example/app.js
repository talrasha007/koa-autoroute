var koa = require('koa'),
    autoroute = require('../');

var app = koa();

app.use(autoroute('/api/', __dirname + '/api'));

// Yep, you can use it just the same way as koa-route.
app.use(autoroute.get('/test', function *() {
    this.body = 'haha';
}));

console.log('Test server is now listening on port 20080');
app.listen(20080);