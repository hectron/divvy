/**
 * Reads data from database (currently static files)
 * Returns JSON
 */

exports.getStations = function(req, res, next) {
    res.sendfile('public/fixtures/Divvy_Stations_2013.json');
};
