try {
    var http = require('http'),
        express = require('express'),
        routes = require('./routes'),
        path = require('path');

    var app = module.exports = express();

    /**
     * Basic Node configuration
     */
    app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080);
    app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    /**
     * Express-specific configuration
     */
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);

    if (app.get('env') === 'production') {
        // TODO
    } else {
        app.use(express.errorHandler());
    }

    /**
     * Routing configuration
     */

    app.get('/', routes.index);
    app.get('/partial/:name', routes.partial);
    app.get('/404', routes.pageNotFound);
    app.get('/403', routes.pageForbidden);
    app.get('/500', routes.internalServerErrorPage);

    http.createServer(app).listen(app.get('port'), app.get('ip'), function () {
        console.log('Express server listening on http://' + app.get('ip') + ':' + app.get('port'));
    });

} catch (e) {
    console.log('Error creating the server: ');
    console.log(e);
    console.log('Have you tried installed all the modules?');
}
