<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

import YsCesium from "../source/YsCesium";

export default {
  name: "CircleRipple",
  mounted() {
    this.ripple();
  },
  methods: {
    ripple() {
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

      const lon = 117.286419;
      const lat = 31.864436;
      app.addDoubleCircleRipple({
        id: ["1", "2"],
        lon: lon,
        lat: lat,
        height: 0,
        maxR: 3000,
        minR: 0, //最好为0
        deviationR: 20, //差值 差值也大 速度越快
        eachInterval: 1000, //两个圈的时间间隔
        imageUrl: "images/redCircle2.png",
      });

      //如果添加中心线的话：
      app.viewer.entities.add({
        name: "",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            lon,
            lat,
            0,
            lon,
            lat,
            5000,
          ]),
          width: 4,
          material: new Cesium.PolylineGlowMaterialProperty({
            //发光线
            glowPower: 0.1,
            color: Cesium.Color.RED,
          }),
        },
      });

      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(117.286419, 31.864436, 1000),
      });
    },
  },
};
</script>

<style scoped>
</style>