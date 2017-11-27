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
var marker;
var markers = [];

//初始化map
function initMap() {

    myPosition = {
        lat: 32.066335,
        lng: 118.76979
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: myPosition,
        zoom: 13
    });


    var stringStartsWith = function(string, startsWith) {
        string = string || "";
        if (startsWith.length > string.length)
            return false;
        return string.substring(0, startsWith.length) === startsWith;
    };

    // 开始建立viewmode
    var ViewModel = function() {

        var self = this;
        this.search = ko.observable('');
        this.locList = ko.observableArray(favorites);

        this.filteredlocList = ko.computed(function() {

            //取索搜框的值
            var filter = self.search();
            var unwrappedLocList = ko.toJS(self.locList);

            // 在地图上显示各个地标
            for (var i = 0; i < unwrappedLocList.length; i++) {
                var tmpLat = unwrappedLocList[i][1];
                var tmpLng = unwrappedLocList[i][2];
                var tmpName = unwrappedLocList[i][0];
                //调用添加地标函数
                var marker = addMarker({
                    _map: map,
                    _lat: tmpLat,
                    _lng: tmpLng,
                    _id: i,
                    _head: tmpName,
                    _data: '<h4 class="title">' + tmpName + '</h4>'
                });
                //每生产一个地标放进 markers数组里
                markers.push(marker);
            }

            //取索搜框的值
            if (filter != "") {
                return unwrappedLocList
            } else {
                return ko.utils.arrayFilter(unwrappedLocList, function(item) {
                    return stringStartsWith(item.title, filter);
                });
            }

        }, this);


        // 左侧地标点击函数
        this.setLoc = function(clickedLoc) {

            var unwrappedLoc = ko.toJS(clickedLoc);
            var unwrappedLocList = ko.toJS(self.locList);

            for (var i = 0; i < unwrappedLocList.length; i++) {
                if (unwrappedLoc[0] == markers[i].title) {
                    pinMarker(unwrappedLoc[0], markers[i]);
                    return;
                }
            };
        }

    }

    // 添加marker
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
                // 调用 marker的动作
                pinMarker(param._data, r);
            });
            return r;
        }
    }

    // pin的动作
    function pinMarker(e, r) {
        if (!r.getMap()._infoWindow) {
            r.getMap()._infoWindow = new google.maps.InfoWindow();
        }

        r.getMap()._infoWindow.close();
        stopAnimation(r);
        r.getMap()._infoWindow.setContent(e);
        r.getMap()._infoWindow.open(r.getMap(), r);
        r.setAnimation(google.maps.Animation.BOUNCE);
    }

    ko.applyBindings(new ViewModel());
}


//设置pin的时间
function stopAnimation(marker) {
    setTimeout(function() {
        marker.setAnimation(null);
    }, 750);
};

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