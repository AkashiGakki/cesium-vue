<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

import YsCesium from "../source/YsCesium";

export default {
  name: "Draw",
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

      let color;
      let camera = viewer.camera;
      let polyline;
      let drawing = false;
      let positions = [];
      let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
      handler.setInputAction(function (click) {
        if (drawing) {
          color.alpha = 0.6;
          viewer.entities.add({
            polygon: {
              hierarchy: {
                positions: positions,
              },
              material: color,
              outline: true,
            },
          });
          viewer.entities.remove(polyline);
          positions = [];
        } else {
          color = Cesium.Color.fromRandom({ alpha: 1.0 });
          polyline = viewer.entities.add({
            polyline: {
              positions: new Cesium.CallbackProperty(function () {
                return positions;
              }, false),
              material: color,
            },
          });
        }
        drawing = !drawing;
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      handler.setInputAction(function (movement) {
        let surfacePosition = camera.pickEllipsoid(movement.endPosition);
        if (drawing && Cesium.defined(surfacePosition)) {
          positions.push(surfacePosition);
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-100, 40, 10000),
      });
    },
  },
};
</script>

<style scoped>
</style>