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


function loc(f) {
   var self = this;
   this.lat = ko.observable(f[1]);
   this.lng = ko.observable(f[2]);
   this.title = ko.observable(f[0]);
 }

var map;
var marker;
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

    for (var i = 0; i < favorites.length; i++) {
        var tmpLat = favorites[i][1];
        var tmpLng = favorites[i][2];
        var tmpName = favorites[i][0];
        var marker = addMarker({
            _map: map,
            _lat: tmpLat,
            _lng: tmpLng,
            _head: '|' + new google.maps.LatLng(tmpLat, tmpLng),
            _data: '<h4 class="title">' + tmpName + '</h4>'
        });
    }

/*  ko.applyBindings(vm);
   $.each(data, function(i, item) {
     vm.points.push(new point(item.tag, item.name, item.location))
   })*/
}


function addMarker(param) {
    var r = new google.maps.Marker({
        map: param._map,
        position: new google.maps.LatLng(param._lat, param._lng),
        icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
        title: param._head,
        animation: google.maps.Animation.DROP
    });
    if (param._data) {
        google.maps.event.addListener(r, 'click', function() {
            // this -> the marker on which the onclick event is being attached
            if (!this.getMap()._infoWindow) {
                this.getMap()._infoWindow = new google.maps.InfoWindow();
                //stopAnimation(this);

            }
            this.getMap()._infoWindow.close();
            stopAnimation(this);
            this.getMap()._infoWindow.setContent(param._data);
            this.getMap()._infoWindow.open(this.getMap(), this);
            this.setAnimation(google.maps.Animation.BOUNCE);
        });
        return r;
   }
}

//设置pin的时间
function stopAnimation(marker) {
    setTimeout(function() {
        marker.setAnimation(null);
    }, 750);
}

// 产生标注并点击出现信息
/*function addMarkerWithTimeout(position, timeout) {
    window.setTimeout(function() {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(position[1], position[2]),
            map: map,
            icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
            title: position[0],
            animation: google.maps.Animation.DROP
        });
    }, timeout);
}*/

// 使用knockout 添加数据
function ViewModel() {
    var self = this;
    self.favorites = ko.observableArray(favorites);
    self.mc = function() {
             addMarker(this);
         }
}
ko.applyBindings(new ViewModel());
