var map = L.map('map').setView([41.8819, -87.7], 11);

L.tileLayer('http://{s}.tile.cloudmade.com/2a8add9297b944d8bf422f516c7716c2/997/256/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);

var apiCall = function() {
    var request = new XMLHttpRequest();
    
    request.open('get', '/api/stations', false);
    request.send();

    return request.responseText;
};

var stations = apiCall();
var markers = [];

if (stations) {
    stations = JSON.parse(stations);
    console.log(stations);
    for (var i = stations.length; i > 0; i--) {
        var station = stations[i - 1];

        if (station) {
            var description = '<div class="popupText">' + station.name + '</div>';
            description += '<p>Capacity: ' + station.dpcapacity + '</p>';
            var marker = L.marker([station.latitude, station.longitude], {
                title: station.name
            }).bindPopup(description).addTo(map);
            markers.push(marker);
        }
    }
}