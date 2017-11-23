/*var locations = [
    ['Bondi Beach', -33.890542, 151.274856, 4],
    ['Coogee Beach', -33.923036, 151.259052, 5],
    ['Cronulla Beach', -34.028249, 151.157507, 3],
    ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    ['Maroubra Beach', -33.950198, 151.259302, 1]
];*/

function initMap() {

    var map;

    myPosition1 = { lat: 31.968789, lng: 118.798537 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: myPosition1,
        zoom: 12
    });


    var favorites = [
        {lat: 32.056134, lng: 118.783043 }];

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < favorites.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(favorites[i].lat, favorites[i].lng),
            map: map，
            title: 'Hello World!'
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(favorites[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));

    }

}