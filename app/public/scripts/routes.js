
window.AppRouter = Backbone.Router.extend({
  routes: {
    "station/:id": "getStation",
    "*actions": "defaultRoute"
  }
});
// Instantiate the router
var app_router = new AppRouter;
app_router.on('route:getStation', function (id) {
    console.log("Get station number " + id);
});
app_router.on('route:defaultRoute', function (actions) {
  console.log("Enjoy your stay at the backbone default route");
});

Backbone.history.start();
