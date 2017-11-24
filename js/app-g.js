var favorites = [
    ['九华山公园', 32.059589, 118.806982, 8],
    ['紫金山', 32.070475, 118.853296, 7],
    ['玄武湖', 32.066879, 118.804326, 6],
    ['鼓楼医院', 32.063115, 118.778222, 5],
    ['南京大学', 32.055763, 118.780057, 4],
    ['东南大学', 32.055982, 118.794211, 3],
    ['大行宫', 32.04097, 118.794822, 2],
    ['新街口', 32.042038, 118.78407, 1]
];
var map;
var markers = [];


function initMap() {

    myPosition1 = {
        lat: 32.066335,
        lng: 118.76979
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: myPosition1,
        zoom: 13
    });

    drop();

}

function drop() {
    clearMarkers();
    for (var i = 0; i < favorites.length; i++) {
        addMarkerWithTimeout(favorites[i], i * 200);
        console.log(favorites[i]);
    }
}


function addMarkerWithTimeout(position, timeout) {
    window.setTimeout(function() {
        markers.push(new google.maps.Marker({
            position: new google.maps.LatLng(position[1], position[2]),
            map: map,
            animation: google.maps.Animation.DROP
        }));

    }, timeout);
}

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}


var infowindow = new google.maps.InfoWindow();



var marker = markers
marker.addListener('click', function() {
    infowindow.open(map, marker);
});