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