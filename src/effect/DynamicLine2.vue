<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

import YsCesium from "../source/YsCesium";

export default {
  name: "DynamicLine2",
  mounted() {
    this.line();
  },
  methods: {
    line() {
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

      const center = { lon: 114.302312702, lat: 30.598026044 };
      const points = [
        // { lon: 111.267729446, lat: 30.698151246 },
        // { lon: 112.126643144, lat: 32.058588576 },
        // { lon: 112.226648859, lat: 30.367904255 },
        // { lon: 114.86171677, lat: 30.468634833 },
        // { lon: 110.670643354, lat: 31.74854078 },
        { lon: 113.371985426, lat: 31.70498833 },
        { lon: 114.317846048, lat: 29.848946148 },
        { lon: 113.414585069, lat: 30.368350431 },
      ];

      const data = {
        image: "images/plane.png", //如果有其他需求 就直接修改ysc内部代码吧 这边就简单写几个参数
        center: center,
        points: points,
        height: 50000, //抛物线的最高点
        multiplier: 100, //动画的运行时间加快倍数//速度
        lineColor: [255, 0, 0, 255], //线的颜色 最后一个255就相当于1
      };
      const dsArr = app.addFlyLinesByCZML(data); // shouldAnimate : true,//允许动画 //这个得必须有！！
      setTimeout(function () {
        for (let i = 0; i < dsArr.length; i++) {
          viewer.dataSources.remove(dsArr[i]);
        }
      }, 1000 * 60); //60秒后清除

      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          114.302312702,
          30.598026044,
          500000
        ),
      });

      const data2 = {
        image: "images/redCircle2.png", //如果有其他需求 就直接修改ysc内部代码吧 这边就简单写几个参数
        center: { lon: 114.302312702, lat: 30.598026044 },
        points: [{ lon: 118.302312702, lat: 30.598026044 }],
        height: 50000, //抛物线的最高点
        multiplier: 100, //动画的运行时间加快倍数//速度 缺陷是 因为时间是唯一的，一个容器不能同时存在两个时间加快倍数，所以。要在一个容器使用两个这个函数，且想要速度不一样，那就改源码的czml吧
        lineColor: [255, 255, 255, 255], //线的颜色 最后一个255就相当于1
      };
      app.addFlyLinesByCZML(data2);
    },
  },
};
</script>

<style scoped>
</style>