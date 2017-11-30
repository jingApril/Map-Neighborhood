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

 function initMap() {


     map = new google.maps.Map(document.getElementById('map'), {
         center: {
             lat: 32.066335,
             lng: 118.76979
         },
         zoom: 13
     });

     //生产map
     function makeMap(LocList) {
         for (var i = 0; i < LocList.length; i++) {
             var tmpLat = LocList[i][1];
             var tmpLng = LocList[i][2];
             var tmpName = LocList[i][0];
             //调用添加地标函数
             var marker = addMarker({
                 _map: map,
                 _lat: tmpLat,
                 _lng: tmpLng,
                 _position: new google.maps.LatLng(tmpLat, tmpLng),
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
             position: param._position,
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

     function stopAnimation(marker) {
         setTimeout(function() {
             marker.setAnimation(null);
         }, 750);
     };

     //过滤子集
     function stringStartsWith(string, startsWith) {
         string = string || "";
         if (startsWith.length > string.length)
             return false;
         return string.substring(0, startsWith.length) === startsWith;
     };

     function Loc(data) {

         this.title = data.title;
         this.location = data.location;
         this.marker = data.marker;
     };


      markers.map(function(marker){
     marker.setVisible(true)
 })

     function MyViewModel() {
         var self = this;
         var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;

        /*          markers.map(function(marker){
             marker.setVisible(true)
         })*/

         self.query = ko.observable('');
         self.locList = ko.observableArray(favorites);
         var unwrappedLocList = ko.toJS(self.locList);
         makeMap(unwrappedLocList);

         this.filteredlocList = ko.computed(function() {
             //取索搜框的值
             var filter = self.query();
             if (!filter) {

                 return unwrappedLocList;

             } else if (reg.test(filter)) {


                 var filteredList = unwrappedLocList.filter(function(item) {
                     // 判断搜索的字符与列表地名是否匹配
                     var matched = item[0].indexOf(filter) !== -1;
                     // 找到对应的 marker
                     var marker = markers.find(function(marker) {
                         return marker.title == item[0]
                     })
                     marker.setVisible(matched)
                     return matched
                 })

                 return filteredList; // 返回筛选后的地点列表

             }
         }, this);


         self.filterClick = function() {

             var filter = self.query();
             if (!filter) {
                 alert("请输入您要的地名");
             } else if (!reg.test(filter)) {
                 alert("请输入中文");
             } else {
                 this.filteredlocList = ko.observableArray(favorites2);
             }
         };

         this.setLoc = function(clickedLoc) {

             var unwrappedLoc = ko.toJS(clickedLoc);
             var unwrappedLocList = ko.toJS(self.locList);
             for (var i = 0; i < unwrappedLocList.length; i++) {
                 if (unwrappedLoc[0] == markers[i].title) {
                     pinMarker(unwrappedLoc[0], markers[i]);
                     return;
                 }
             };
         };
     }


     ko.applyBindings(new MyViewModel());
 }