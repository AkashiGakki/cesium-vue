<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

import YsCesium from "../source/YsCesium";

export default {
  name: "FlashCircle",
  mounted() {
    this.point();
  },
  methods: {
    point() {
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
      function addShinePoint() {
        let x = 1;
        let flog = true;
        viewer.entities.add({
          name: "圆点point闪烁",
          position: Cesium.Cartesian3.fromDegrees(lon + 0.03, lat + 0.03, 0),
          point: {
            show: true, // default
            color: new Cesium.CallbackProperty(function () {
              if (flog) {
                x = x - 0.05;
                if (x <= 0) {
                  flog = false;
                }
              } else {
                x = x + 0.05;
                if (x >= 1) {
                  flog = true;
                }
              }
              return Cesium.Color.RED.withAlpha(x);
            }, false),
            pixelSize: 10, // default: 1
            outlineWidth: 0,
          },
        });
      }
      addShinePoint();
      viewer.zoomTo(viewer.entities);
    },
  },
};
</script>

<style scoped>
</style>