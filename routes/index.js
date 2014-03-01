'use strict';
/**
 * The default routes for the application
 */

exports.index = function(req, res, next) {
    res.render('index', { pageTitle: 'Index' });
};

exports.partials = function (req, res, next) {
    try {
        var name = req.params.name;
        res.render('partials/partial' + name);
    } catch (e) {
        console.error(e);
        next(new Error('Unable to render partial'));
    }
};

/**
 * Error handlers
 */
exports.pageNotFound = function(req, res, next) {
    // trigger a 404 since no other middleware
    // will match /404 after this one, and we're not
    // responding here
    next();
};

exports.pageForbidden = function(req, res, next) {
    // trigger a 403 error
    var err = new Error('Not allowed!');
    err.status = 403;
    next(err);
};

exports.internalServerErrorPage = function(req, res, next) {
    // trigger a generic 500 error
    next(new Error('doge'));
};

// Page not found handler
// $ curl http://localhost:8080/notfound
// $ curl http://localhost:8080/notfound -H "Accept: application/json"
// $ curl http://localhost:8080/notfound -H "Accept: text/plain"

exports.pageNotFoundHandler = function(err, req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.
        return ('404', {
            url: req.url
        });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({
            error: 'Not found',
            url: req.url
        });
        return;
    }

    // default to plain-text
    res.type('txt').send('Page not found.');
};

// Generic handler for errors
exports.errorHandler = function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('500', {
        error: err
    });
};
