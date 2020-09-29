<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

import YsCesium from "../source/YsCesium";

export default {
  name: "DynamicLine",
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

      const lat = 30.598026044;
      const lon = 114.302312702;

      //设置初始位置
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, 300000),
      });
      /** 一 普通折现**/
      const data1 = {
        options: {
          //options 内为原始参数
          name: "yscNoNeedEntity",
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
              lon,
              lat,
              0, //0 表示高度
              lon + 1,
              lat,
              0,
              lon + 1,
              lat + 1,
              0,
              lon + 2,
              lat + 1,
              0,
              lon + 2,
              lat + 2,
              0,
            ]),
            width: 5,
            clampToGround: true, //贴地
            material: Cesium.Color.RED,
          },
        },
      };

      app.addPolyline(data1);

      /** 二 流动折线**/
      const data2 = {
        flowing: true,
        flowImage: "images/colors1.png", //飞行线的图片
        options: {
          name: "yscNoNeedEntity",
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
              lon,
              lat,
              0, //0 表示高度
              lon - 1,
              lat,
              0,
              lon - 1,
              lat - 1,
              0,
              lon - 2,
              lat - 1,
              0,
              lon - 2,
              lat - 2,
              0,
            ]),
            width: 5,
            clampToGround: true, //贴地
            material: Cesium.Color.YELLOW,
            interval: 3000,
          },
        },
      };
      app.addPolyline(data2);

      /** 三 普通抛物线**/
      const data3 = {
        center: { lat: lat + 3, lon: lon + 3 }, //起始点
        points: [
          { lat: lat + 5, lon: lon - 5 },
          { lat: lat + 6, lon: lon + 6 },
          { lat: lat + 3, lon: lon + 7 },
        ],
        height: 50000, //抛物线最大高度
        options: {
          name: "yscNoNeedEntity",
          polyline: {
            width: 2, //线宽度
            material: Cesium.Color.RED,
          },
        },
      };
      app.addParabola(data3);

      /** 四 流动抛物线**/
      var data4 = {
        flowing: true,
        center: { lat: lat - 3, lon: lon - 3 }, //起始点
        height: 50000, //抛物线最大高度
        flowImage: "images/colors1.png", //飞行线的图片
        points: [
          { lat: lat - 5, lon: lon + 5 },
          { lat: lat - 6, lon: lon - 6 },
          { lat: lat - 3, lon: lon - 7 },
        ], //可以多个
        options: {
          name: "yscNoNeedEntity",
          polyline: {
            width: 2, //线宽度
            material: Cesium.Color.YELLOW,
            interval: 3000, //混合颜色、(红绿混合透明后 就是黄色了)3000秒发射间隔,单纯材质无法展示飞行动态。所以去掉了。
          },
        },
      };

      app.addParabola(data4);

      /** 墙*/
      var data5 = {
        flowing: true,
        flowImage: "images/colors1.png", //飞行线的图片
        options: {
          name: "this is YELLOW wall from surface",
          wall: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
              lon - 0.5,
              lat - 0.5,
              50000, //0 表示高度
              lon - 3,
              lat,
              50000,
              lon - 3,
              lat - 1,
              50000,
              lon - 1,
              lat - 3,
              50000,
              lon - 0.5,
              lat - 0.5,
              50000,
            ]),
            minimumHeights: [0, 0, 0, 0, 0], //墙距离地面的距离。
            material: Cesium.Color.YELLOW,
            interval: 3000, //混合颜色、(红绿混合透明后 就是黄色了)3000秒发射间隔,单纯材质无法展示飞行动态。所以去掉了。
            outline: false,
          },
        },
      };
      app.addWall(data5);
    },
  },
};
</script>

<style scoped>
</style>