<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

export default {
  name: "AddGeometry",
  mounted() {
    this.init();
    this.addGeometry();
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
    },
    addGeometry() {
      let polyline = {
        positions: Cesium.Cartesian3.fromDegreesArray([
          10.0,
          10.0,
          15.0,
          10.0,
          15.0,
          15.0,
        ]),
        width: 20.0,
      };

      let geometryPloyline = new Cesium.SimplePolylineGeometry(polyline);

      this.$viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: polyline,
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.RED.withAlpha(0.5)
              ),
            },
          }),
        })
      );

      // let line = this.$viewer.entities.add({
      //   polyline: {
      //     positions: Cesium.Cartesian3.fromDegreesArray([
      //       10.0,
      //       10.0,
      //       11.0,
      //       10.0,
      //       11.0,
      //       11.0,
      //     ]),
      //     width: 5,
      //     material: Cesium.Color.RED.withAlpha(0.5),
      //     clampToGround: true,
      //   },
      // });

      this.$viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(10.0, 10.0, 2000),
        // orientation: {
        //   heading: Cesium.Math.toRadians(-3.0),
        //   pitch: Cesium.Math.toRadians(-10.0),
        //   roll: Cesium.Math.toRadians(0.0),
        // },
      });
    },
  },
};
</script>

<style scoped>
</style>