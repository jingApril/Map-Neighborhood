  function init() {
      // 创建地图对象
      var map = new AMap.Map('container', {
          center: [118.798537, 31.968789],
          zoom: 11
      });

      map.plugin(["AMap.ToolBar"], function() {
          // 添加 工具条
          map.addControl(new AMap.ToolBar());
      });

      //创建标记集合
      var markers = [{
          title: '鼓楼',
          position: [118.783043, 32.056134]
      }, {
          title: '南京大学',
          position: [118.77943, 32.055015]
      }, {
          title: '东南大学',
          position: [118.79484, 32.054227]
      }, {
          title: '鼓楼医院',
          position: [118.783043, 32.056134]
      }, {
          title: '玄武湖',
          position: [118.798908, 32.072357]
      }];

      //创建 默认信息窗口
      var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -30)
      });

      // 构建标记
      markers.forEach(function(marker) {

          var newMarker = new AMap.Marker({
              map: map,
              position: [marker.position[0], marker.position[1]],
              title: marker.title,
              icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
              offset: new AMap.Pixel(-12, -36)
          });

          newMarker.content = "这里是" + marker.title;

          //为标记绑定 点击事件
          newMarker.on('click', markerClick);
      });


      //点击事件方法主体
      function markerClick(e) {
          infoWindow.setContent(e.target.content);
          infoWindow.open(map, e.target.getPosition());
      }
      //自动缩放地图到合适的视野级别
      map.setFitView();
  }