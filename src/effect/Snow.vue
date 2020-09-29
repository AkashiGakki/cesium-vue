<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

import YsCesium from "../source/YsCesium";

export default {
  name: "Sonw",
  mounted() {
    this.init();
    this.snow();
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
    },
    // 雪景
    snow() {
      let vm = this;
      this.$viewer.terrainProvider = Cesium.createWorldTerrain();
      this.$viewer.scene.globe.depthTestAgainstTerrain = true;
      this.$viewer.scene.camera.setView({
        destination: new Cesium.Cartesian3(
          277096.634865404,
          5647834.481964232,
          2985563.7039122293
        ),
        orientation: {
          heading: 4.731089976107251,
          pitch: -0.32003481981370063,
        },
      });

      let snowGravityVector = new Cesium.Cartesian3();
      let snowUpdate = function (particle, dt) {
        dt;
        Cesium.Cartesian3.normalize(particle.position, snowGravityVector);
        Cesium.Cartesian3.multiplyByScalar(
          snowGravityVector,
          Cesium.Math.randomBetween(-30.0, -300.0),
          snowGravityVector
        );
        particle.velocity = Cesium.Cartesian3.add(
          particle.velocity,
          snowGravityVector,
          particle.velocity
        );

        let distance = Cesium.Cartesian3.distance(
          vm.$viewer.scene.camera.position,
          particle.position
        );
        if (distance > snowRadius) {
          particle.endColor.alpha = 0.0;
        } else {
          particle.endColor.alpha =
            snowSystem.endColor.alpha / (distance / snowRadius + 0.1);
        }
      };

      // 雾与大气效果
      this.$viewer.scene.skyAtmosphere.hueShift = -0.8;
      this.$viewer.scene.skyAtmosphere.saturationShift = -0.7;
      this.$viewer.scene.skyAtmosphere.brightnessShift = -0.33;

      this.$viewer.scene.fog.density = 0.001;
      this.$viewer.scene.fog.minimumBrightness = 0.8;

      let snowParticleSize = this.$viewer.scene.drawingBufferWidth / 100.0;
      let snowRadius = 100000.0;

      let snowSystem = new Cesium.ParticleSystem({
        modelMatrix: new Cesium.Matrix4.fromTranslation(
          this.$viewer.scene.camera.position
        ),
        minimumSpeed: -1.0,
        maximumSpeed: 0.0,
        lifetime: 15.0,
        emitter: new Cesium.SphereEmitter(snowRadius),
        startScale: 0.5,
        endScale: 1.0,
        // image: "images/snowflake-particle.png",
        // image: "images/snowflake.png",
        image: "images/snow.png",
        emissionRate: 1000.0,
        startColor: Cesium.Color.WHITE.withAlpha(0.0),
        endColor: Cesium.Color.WHITE.withAlpha(1.0),
        minimumImageSize: new Cesium.Cartesian2(
          snowParticleSize,
          snowParticleSize
        ),
        maximumImageSize: new Cesium.Cartesian2(
          snowParticleSize,
          snowParticleSize
        ),
        updateCallback: snowUpdate,
      });
      this.$viewer.scene.primitives.add(snowSystem);
    },
  },
};
</script>

<style scoped>
</style>