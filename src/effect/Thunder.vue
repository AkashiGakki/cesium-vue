<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

import YsCesium from "../source/YsCesium";

export default {
  name: "Thunder",
  mounted() {
    this.init();
    this.thunder();
  },
  methods: {
    init() {
      let vm = this;
      let viewerOption = {
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

      // your token
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MTFkZDY2NC00NjE4LTQyOTMtOTZhMS1lNzU4OWJhY2ZkNzgiLCJpZCI6MzE2NDQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTU3NTkxODV9.pkaTjYrzbEswbhOy2X4KelZpDepVSgxN7f_GVYl6BiQ";

      this.$viewer = new Cesium.Viewer(this.$refs.viewer, viewerOption);

      // 隐藏Logo
      this.$viewer.cesiumWidget.creditContainer.style.display = "none";

      let mousePosition, startMousePosition;
      let handler = new Cesium.ScreenSpaceEventHandler(this.$viewer.canvas);

      handler.setInputAction(function (movement) {
        mousePosition = startMousePosition = Cesium.Cartesian3.clone(
          movement.position
        );
        handler.setInputAction(function (movement) {
          mousePosition = movement.endPosition;
          let y = mousePosition.y - startMousePosition.y;
          if (y > 0) {
            vm.$viewer.scene.screenSpaceCameraController.enableTilt = true;
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);
    },
    thunder() {
      let vm = this;
      this.$viewer.scene.camera.setView({
        destination: new Cesium.Cartesian3.fromDegrees(121.5064, 31.247, 1000),
        orientation: {
          heading: 10,
          pitch: 0,
        },
      });

      let thunderSystem = new Cesium.ParticleSystem({
        image: "images/thunder.png",
        // image: "images/thunder_png.png",
        imageSize: new Cesium.Cartesian2(64, 64),
        startScale: 1.0,
        endScale: 4.0,
        particleLife: 1.0,
        speed: 5.0,
        emitter: new Cesium.SphereEmitter(2000.0),
        emissionRate: 7.0,
        modelMatrix: new Cesium.Matrix4.fromTranslation(
          vm.$viewer.scene.camera.position
        ),
        lifetime: 16.0,
      });

      this.$viewer.scene.skyAtmosphere.hueShift = -0.8;
      this.$viewer.scene.skyAtmosphere.saturationShift = -0.7;
      this.$viewer.scene.skyAtmosphere.brightnessShift = -0.2;

      this.$viewer.scene.fog.density = 0.001;
      this.$viewer.scene.fog.minimumBrightness = 0.8;

      this.$viewer.scene.primitives.add(thunderSystem);
    },
  },
};
</script>

<style scoped>
</style>