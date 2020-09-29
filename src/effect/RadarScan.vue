<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

import YsCesium from "../source/YsCesium";

export default {
  name: "RadarScan",
  mounted() {
    this.scan();
  },
  methods: {
    scan() {
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

      app.addRadarScan({
        lon: 117.217124, //经度
        lat: 31.809777, //纬度
        scanColor: new Cesium.Color(0, 1.0, 0, 1),
        r: 1500, //扫描半径
        interval: 4000, //时间间隔
      });
      //飞行到这个位子
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          117.217124,
          31.809777,
          5000.0
        ),
        orientation: {
          heading: Cesium.Math.toRadians(90.0), // east, default value is 0.0 (north) //东西南北朝向
          pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
          roll: 0.0, // default value
        },
        duration: 3, //3秒到达战场
      });
    },
  },
};
</script>

<style scoped>
</style>