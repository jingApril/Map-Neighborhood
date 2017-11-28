//数据
var map;
var marker;
var markers = [];

var favorites = [
    ['九华山公园', 32.059589, 118.806982, 10],
    ['九华火车站', 32.086727, 118.796834, 9],
    ['南京金茂汇', 32.072683, 118.783387, 8],
    ['九华山', 32.070475, 118.853296, 7],
    ['玄武湖', 32.066879, 118.804326, 6],
    ['九华医院', 32.063115, 118.778222, 5],
    ['南京大学', 32.055763, 118.780057, 4],
    ['九华南大学', 32.055982, 118.794211, 3],
    ['大行宫', 32.04097, 118.794822, 2],
    ['新街口', 32.042038, 118.78407, 1]
];

/*var locList = ko.observableArray(favorites);
var unwrappedLocList = ko.toJS(locList);

var mappedData = ko.utils.arrayMap(unwrappedLocList, function(item) {
    return new Loc(item.name, item.tmpLat, item.tmpLng);
});


var Loc = function(data) {
    this.name = ko.observable(data[0]);
    this.tmpLat = ko.observable(data[1]);
    this.tmpLng = ko.observable(data[2]);
};
*/


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

    //生产map
    function mapChange(LocList) {
        for (var i = 0; i < LocList.length; i++) {
            var tmpLat = LocList[i][1];
            var tmpLng = LocList[i][2];
            var tmpName = LocList[i][0];
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
    };

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
    };


    // 开始建立viewmode
    function ViewModel() {

        var self = this;
        this.query = ko.observable('');
        this.locList = ko.observableArray(favorites);
        var unwrappedLocList = ko.toJS(self.locList);
        mapChange(unwrappedLocList);

        this.filteredlocList = ko.computed(function() {

            //取索搜框的值
            var filter = self.query();

            if (!filter) {
                return unwrappedLocList;
                debugger;

            } else {

                return ko.utils.arrayFilter(unwrappedLocList, function(item) {
                    return stringStartsWith(item[0], filter);
                    //consol.log(unwrappedLocList);
                    debugger;
                    unwrappedLocList = ko.observableArray(ko.utils.arrayMap(unwrappedLocList, item));
                    return unwrappedLocList;
                    console.log(unwrappedLocList)
                });
                debugger;
            }
        }, this);

        // 左侧地标点击对应的地标Y有动作
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

    };

    //过滤子集
    function stringStartsWith(string, startsWith) {
        string = string || "";
        if (startsWith.length > string.length)
            return false;
        return string.substring(0, startsWith.length) === startsWith;
    };


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
    };

    //设置pin的时间
    function stopAnimation(marker) {
        setTimeout(function() {
            marker.setAnimation(null);
        }, 750);
    };


    ko.applyBindings(new ViewModel());


}