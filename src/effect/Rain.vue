<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

import YsCesium from "../source/YsCesium";

export default {
  name: "Rain",
  mounted() {
    this.init();
    this.rain();
  },
  methods: {
    init() {
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

      this.$viewer.terrainProvider = Cesium.createWorldTerrain();
      this.$viewer.scene.globe.depthTestAgainstTerrain = true;
    },
    // 雨景
    rain() {
      let vm = this;
      this.$viewer.terrainProvider = Cesium.createWorldTerrain();
      this.$viewer.scene.globe.depthTestAgainstTerrain = true;
      this.$viewer.scene.camera.setView({
        destination: new Cesium.Cartesian3.fromDegrees(
          -75.62808254394531,
          40.02624946899414,
          1500.0
        ),
        orientation: {
          heading: Cesium.Math.toRadians(-3.0),
          pitch: Cesium.Math.toRadians(1.0),
          roll: Cesium.Math.toRadians(0.0),
        },
      });

      // rain
      this.$viewer.scene.skyAtmosphere.hueShift = -0.97;
      this.$viewer.scene.skyAtmosphere.saturationShift = 0.25;
      this.$viewer.scene.skyAtmosphere.brightnessShift = -0.4;

      this.$viewer.scene.fog.density = 0.00025;
      this.$viewer.scene.fog.minimumBrightness = 0.01;

      let rainParticleSize = this.$viewer.scene.drawingBufferWidth / 100.0;
      let rainRadius = 100000.0;

      let rainGravityScratch = new Cesium.Cartesian3();
      let rainUpdate = function (particle, dt) {
        dt;
        rainGravityScratch = Cesium.Cartesian3.normalize(
          particle.position,
          rainGravityScratch
        );
        rainGravityScratch = Cesium.Cartesian3.multiplyByScalar(
          rainGravityScratch,
          -1050.0,
          rainGravityScratch
        );

        particle.position = Cesium.Cartesian3.add(
          particle.position,
          rainGravityScratch,
          particle.position
        );

        let distance = Cesium.Cartesian3.distance(
          vm.$viewer.scene.camera.position,
          particle.position
        );
        if (distance > rainRadius) {
          particle.endColor.alpha = 0.0;
        } else {
          particle.endColor.alpha =
            rainSystem.endColor.alpha / (distance / rainRadius + 0.1);
        }
      };

      let rainSystem = new Cesium.ParticleSystem({
        modelMatrix: new Cesium.Matrix4.fromTranslation(
          this.$viewer.scene.camera.position
        ),
        speed: -1.0,
        lifetime: 15.0,
        emitter: new Cesium.SphereEmitter(rainRadius),
        startScale: 1.3,
        endScale: 0.0,
        image: "images/rain.png",
        emissionRate: 900.0,
        startColor: new Cesium.Color(0.27, 0.4, 0.5, 0.3),
        endColor: new Cesium.Color(0.27, 0.4, 0.7, 0.98),
        imageSize: new Cesium.Cartesian2(
          rainParticleSize,
          rainParticleSize * 2
        ),
        updateCallback: rainUpdate,
      });
      this.$viewer.scene.primitives.add(rainSystem);
    },
  },
};
</script>

<style scoped>
</style>