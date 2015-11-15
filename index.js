var _ = require('codash'),
    fs = require('fs'),
    path = require('path'),
    methods = require('koa-route/node_modules/methods');
    koaRoute = require('koa-route');

var autoRoute = module.exports = function (routePath, dir) {
    if (routePath[routePath.length - 1] === '/') routePath = routePath.slice(0, routePath.length - 1);

    var handlers = {};
    function setup(obj, dir) {
        var items = fs.readdirSync(dir);

        items.forEach(function (item) {
            var fullPath = path.join(dir, item),
                st = fs.statSync(fullPath);

            if (st.isDirectory()) {
                setup(obj[item] = {}, fullPath);
            } else {
                if (/\.js$/i.test(item)) {
                    obj[item.replace(/\.js$/i, '')] = require(fullPath);
                }
            }
        });
    }

    setup(handlers, dir);

    return koaRoute.all(routePath + '/(.*)', function *(relPath, next) {
        if (!relPath) return yield* next;

        var method = this.method.toLocaleLowerCase(),
            parts = relPath.split('/'),
            handler = handlers;

        parts.forEach(function (p, idx) {
            if (handler) {
                if (idx !== parts.length - 1) {
                    handler = handler[p];
                } else {
                    handler = (handler[method] && handler[method][p]) || (handler.all && handler.all[p]) || handler[p];
                }
            }
        });

        if (handler && _.isGenerator(handler)) yield* handler.call(this, next);
        else yield* next;
    });
};

methods.forEach(function (method) {
    autoRoute[method] = koaRoute[method];
});
