var koa = require('koa'),
    autoroute = require('../');

var app = koa();

app.use(autoroute('/api/', __dirname + '/api'));

console.log('Test server is now listening on port 20080');
app.listen(20080);