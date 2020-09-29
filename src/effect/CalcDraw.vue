<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

import YsCesium from "../source/YsCesium";

export default {
  name: "CalcDraw",
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      const options = {
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        infoBox: false,
        selectionIndicator: false,
        scene3DOnly: true,
        shadows: true,
        shouldAnimate: true,
      };
      const app = new YsCesium("container", options);
      const viewer = app.viewer;

      viewer.cesiumWidget.creditContainer.style.display = "none";

      let scene = viewer.scene;
      let canvas = viewer.canvas;
      let camera = viewer.camera;
      // scene.screenSpaceCameraController.minimumZoomDistance = 100;
      // viewer.clock.onTick.addEventListener(function () {
      //   setMinCamera();
      // });
      // let setMinCamera = function () {
      //   if (camera.pitch > 0) {
      //     scene.screenSpaceCameraController.enableTilt = false;
      //   }
      // };

      let startMousePosition;
      let mousePosition;
      let handler = new Cesium.ScreenSpaceEventHandler(canvas);
      handler.setInputAction(function (movement) {
        mousePosition = startMousePosition = Cesium.Cartesian3.clone(
          movement.position
        );
        handler.setInputAction(function (movement) {
          mousePosition = movement.endPosition;
          let y = mousePosition.y - startMousePosition.y;
          if (y > 0) {
            scene.screenSpaceCameraController.enableTilt = true;
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);

      //测量空间直线距离
      /******************************************* */
      function measureLineSpace(viewer) {
        // 取消双击事件-追踪该位置
        viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
          Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
        );

        let handler = new Cesium.ScreenSpaceEventHandler(
          viewer.scene._imageryLayerCollection
        );
        let positions = [];
        let poly = null;
        // let tooltip = document.getElementById("toolTip");
        let distance = 0;
        let cartesian = null;
        let floatingPoint;
        // tooltip.style.display = "block";

        //鼠标起点定位后 鼠标移动开始画线移动
        handler.setInputAction(function (movement) {
          // tooltip.style.left = movement.endPosition.x + 3 + "px";
          // tooltip.style.top = movement.endPosition.y - 25 + "px";
          // tooltip.innerHTML = '<p>单击开始，右击结束</p>';
          // cartesian = viewer.scene.pickPosition(movement.endPosition);
          let ray = viewer.camera.getPickRay(movement.endPosition);
          cartesian = viewer.scene.globe.pick(ray, viewer.scene);
          //cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
          if (positions.length >= 2) {
            if (!Cesium.defined(poly)) {
              poly = new PolyLinePrimitive(positions);
            } else {
              positions.pop();
              // cartesian.y += (1 + Math.random());
              positions.push(cartesian);
            }
            distance = getSpaceDistance(positions);
            // console.log("distance: " + distance);
            // tooltip.innerHTML='<p>'+distance+'米</p>';
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        //左键点击事件
        handler.setInputAction(function (movement) {
          // tooltip.style.display = "none";
          // cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
          // cartesian = viewer.scene.pickPosition(movement.position);
          let ray = viewer.camera.getPickRay(movement.position);
          cartesian = viewer.scene.globe.pick(ray, viewer.scene);
          if (positions.length === 0) {
            positions.push(cartesian.clone());
          }
          positions.push(cartesian);
          //在三维场景中添加Label
          //   let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          let textDisance = distance + "米";
          // console.log(textDisance + ",lng:" + cartographic.longitude/Math.PI*180.0);
          floatingPoint = viewer.entities.add({
            name: "空间直线距离",
            // position: Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180,cartographic.height),
            position: positions[positions.length - 1],
            point: {
              pixelSize: 5,
              color: Cesium.Color.RED,
              outlineColor: Cesium.Color.WHITE,
              outlineWidth: 2,
            },
            label: {
              text: textDisance,
              font: "18px sans-serif",
              fillColor: Cesium.Color.GOLD,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              outlineWidth: 2,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(20, -20),
            },
          });
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        //右键取消
        handler.setInputAction(function (movement) {
          handler.destroy(); //关闭事件句柄
          positions.pop(); //最后一个点无效
          // viewer.entities.remove(floatingPoint);
          // tooltip.style.display = "none";
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

        let PolyLinePrimitive = (function () {
          function _(positions) {
            this.options = {
              name: "直线",
              polyline: {
                show: true,
                positions: [],
                material: Cesium.Color.CHARTREUSE,
                width: 10,
                clampToGround: true,
              },
            };
            this.positions = positions;
            this._init();
          }

          _.prototype._init = function () {
            let _self = this;
            let _update = function () {
              return _self.positions;
            };
            //实时更新polyline.positions
            this.options.polyline.positions = new Cesium.CallbackProperty(
              _update,
              false
            );
            viewer.entities.add(this.options);
          };

          return _;
        })();

        //空间两点距离计算函数
        function getSpaceDistance(positions) {
          let distance = 0;
          for (let i = 0; i < positions.length - 1; i++) {
            let point1cartographic = Cesium.Cartographic.fromCartesian(
              positions[i]
            );
            let point2cartographic = Cesium.Cartographic.fromCartesian(
              positions[i + 1]
            );
            /**根据经纬度计算出距离**/
            let geodesic = new Cesium.EllipsoidGeodesic();
            geodesic.setEndPoints(point1cartographic, point2cartographic);
            let s = geodesic.surfaceDistance;
            //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
            //返回两点之间的距离
            s = Math.sqrt(
              Math.pow(s, 2) +
                Math.pow(
                  point2cartographic.height - point1cartographic.height,
                  2
                )
            );
            distance = distance + s;
          }
          return distance.toFixed(2);
        }
      }

      // measureLineSpace(viewer);

      //****************************测量空间面积************************************************//
      function measureAreaSpace(viewer, handler) {
        // 取消双击事件-追踪该位置
        viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
          Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
        );
        // 鼠标事件
        handler = new Cesium.ScreenSpaceEventHandler(
          viewer.scene._imageryLayerCollection
        );
        let positions = [];
        let tempPoints = [];
        let polygon = null;

        let cartesian = null;
        let floatingPoint; //浮动点
        handler.setInputAction(function (movement) {
          // cartesian = viewer.scene.pickPosition(movement.endPosition);
          let ray = viewer.camera.getPickRay(movement.endPosition);
          cartesian = viewer.scene.globe.pick(ray, viewer.scene);
          // cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
          if (positions.length >= 2) {
            if (!Cesium.defined(polygon)) {
              polygon = new PolygonPrimitive(positions);
            } else {
              positions.pop();
              // cartesian.y += (1 + Math.random());
              positions.push(cartesian);
            }
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        handler.setInputAction(function (movement) {
          // cartesian = viewer.scene.pickPosition(movement.position);
          let ray = viewer.camera.getPickRay(movement.position);
          cartesian = viewer.scene.globe.pick(ray, viewer.scene);
          // cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
          if (positions.length === 0) {
            positions.push(cartesian.clone());
          }
          //positions.pop();
          positions.push(cartesian);
          //在三维场景中添加点
          let cartographic = Cesium.Cartographic.fromCartesian(
            positions[positions.length - 1]
          );
          let longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
          let latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
          let heightString = cartographic.height;
          tempPoints.push({
            lon: longitudeString,
            lat: latitudeString,
            hei: heightString,
          });
          floatingPoint = viewer.entities.add({
            name: "点",
            position: positions[positions.length - 1],
            point: {
              pixelSize: 5,
              color: Cesium.Color.RED,
              outlineColor: Cesium.Color.WHITE,
              outlineWidth: 2,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            },
          });
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        handler.setInputAction(function (movement) {
          handler.destroy();
          positions.pop();
          //在三维场景中添加点
          // let cartographic = Cesium.Cartographic.fromCartesian(positions[positions.length - 1]);
          // let longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
          // let latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
          // let heightString = cartographic.height;
          // tempPoints.push({ lon: longitudeString, lat: latitudeString ,hei:heightString});

          let textArea = getArea(tempPoints) + "平方公里";
          viewer.entities.add({
            name: "多边形面积",
            position: positions[positions.length - 1],
            // point : {
            //  pixelSize : 5,
            //  color : Cesium.Color.RED,
            //  outlineColor : Cesium.Color.WHITE,
            //  outlineWidth : 2,
            //  heightReference:Cesium.HeightReference.CLAMP_TO_GROUND
            // },
            label: {
              text: textArea,
              font: "18px sans-serif",
              fillColor: Cesium.Color.GOLD,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              outlineWidth: 2,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(20, -40),
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            },
          });
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

        let radiansPerDegree = Math.PI / 180.0; //角度转化为弧度(rad)
        let degreesPerRadian = 180.0 / Math.PI; //弧度转化为角度

        //计算多边形面积
        function getArea(points) {
          let res = 0;
          //拆分三角曲面

          for (let i = 0; i < points.length - 2; i++) {
            let j = (i + 1) % points.length;
            let k = (i + 2) % points.length;
            let totalAngle = Angle(points[i], points[j], points[k]);

            let dis_temp1 = distance(positions[i], positions[j]);
            let dis_temp2 = distance(positions[j], positions[k]);
            res += dis_temp1 * dis_temp2 * Math.abs(Math.sin(totalAngle));
          }

          return (res / 1000000.0).toFixed(4);
        }

        /*角度*/
        function Angle(p1, p2, p3) {
          let bearing21 = Bearing(p2, p1);
          let bearing23 = Bearing(p2, p3);
          let angle = bearing21 - bearing23;
          if (angle < 0) {
            angle += 360;
          }
          return angle;
        }
        /*方向*/
        function Bearing(from, to) {
          let lat1 = from.lat * radiansPerDegree;
          let lon1 = from.lon * radiansPerDegree;
          let lat2 = to.lat * radiansPerDegree;
          let lon2 = to.lon * radiansPerDegree;
          let angle = -Math.atan2(
            Math.sin(lon1 - lon2) * Math.cos(lat2),
            Math.cos(lat1) * Math.sin(lat2) -
              Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)
          );
          if (angle < 0) {
            angle += Math.PI * 2.0;
          }
          angle = angle * degreesPerRadian; //角度
          return angle;
        }

        let PolygonPrimitive = (function () {
          function _(positions) {
            this.options = {
              name: "多边形",
              polygon: {
                hierarchy: new Cesium.PolygonHierarchy([]),
                // perPositionHeight : true,
                material: Cesium.Color.GREEN.withAlpha(0.5),
                // heightReference:20000
              },
            };
            this.hierarchy = new Cesium.PolygonHierarchy(positions);
            this._init();
          }

          _.prototype._init = function () {
            let _self = this;
            let _update = function () {
              return _self.hierarchy;
            };
            //实时更新polygon.hierarchy
            this.options.polygon.hierarchy = new Cesium.CallbackProperty(
              _update,
              false
            );
            viewer.entities.add(this.options);
          };

          return _;
        })();

        function distance(point1, point2) {
          let point1cartographic = Cesium.Cartographic.fromCartesian(point1);
          let point2cartographic = Cesium.Cartographic.fromCartesian(point2);
          /**根据经纬度计算出距离**/
          let geodesic = new Cesium.EllipsoidGeodesic();
          geodesic.setEndPoints(point1cartographic, point2cartographic);
          let s = geodesic.surfaceDistance;
          //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
          //返回两点之间的距离
          s = Math.sqrt(
            Math.pow(s, 2) +
              Math.pow(point2cartographic.height - point1cartographic.height, 2)
          );
          return s;
        }
      }
      measureAreaSpace(viewer);
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          117.286419,
          30.864436,
          20000.0
        ),
      });
    },
  },
};
</script>

<style scoped>
</style>