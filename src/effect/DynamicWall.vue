<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

export default {
  name: "Wall",
  mounted() {
    this.init();
    this.wall();
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
    wall() {
      let vm = this;
      let lon = 117.191677;
      let lat = 31.766884;
      let height = 9841.8;
      this.$viewer.scene.camera.flyTo({
        destination: new Cesium.Cartesian3.fromDegrees(lon, lat, height),
        complete: () => {
          vm.$viewer.scene.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, 2000),
            orientation: {
              heading: Cesium.Math.toRadians(-3.0),
              pitch: Cesium.Math.toRadians(-10.0),
              roll: Cesium.Math.toRadians(0.0),
            },
          });
        },
      });

      let wall = {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          117.216321,
          31.842863,
          100,
          117.246056,
          31.843395,
          100,
          117.246503,
          31.818713,
          100,
          117.217114,
          31.819745,
          100,
          117.216566,
          31.842705,
          100,
        ]),
        maximumHeights: [500, 500, 500, 500, 500],
        minimumHeights: [38, 44, 34, 34, 38],
      };
      let geometryWall = new Cesium.WallGeometry(wall);

      this.$viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: geometryWall,
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.YELLOW.withAlpha(0.5)
              ),
            },
          }),
          appearance: new Cesium.PerInstanceColorAppearance(),
        })
      );

      let forbidWall = {
        positions: Cesium.Cartesian3.fromDegreesArray([
          117.191537,
          31.809769,
          117.198383,
          31.804991,
        ]),
        width: 100,
        maximumHeights: [500, 500],
        minimumHeights: [41.14, 39.84],
      };
      let geometryForbidWall = new Cesium.WallGeometry(forbidWall);
      this.$viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: geometryForbidWall,
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.RED.withAlpha(0.5)
              ),
            },
          }),
          appearance: new Cesium.PerInstanceColorAppearance({}),
        })
      );

      let fenceWall = {
        positions: Cesium.Cartesian3.fromDegreesArray([
          117.154815,
          31.853495,
          117.181255,
          31.854257,
          117.182284,
          31.848255,
          117.184748,
          31.840141,
          117.180557,
          31.835556,
          117.180023,
          31.833741,
          117.166846,
          31.833737,
          117.155531,
          31.833151,
          117.154787,
          31.835978,
          117.151994,
          31.839036,
          117.150691,
          31.8416,
          117.151215,
          31.844734,
          117.154788,
          31.853486,
        ]),
        maximumHeights: [
          600,
          600,
          600,
          600,
          600,
          600,
          600,
          600,
          600,
          600,
          600,
          600,
          600,
        ],
        minimumHeights: [43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43],
      };
      let geometryFenceWall = new Cesium.WallGeometry(fenceWall);
      this.$viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: geometryFenceWall,
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.GREEN.withAlpha(0.5)
              ),
            },
          }),
          appearance: new Cesium.PerInstanceColorAppearance({}),
        })
      );

      let arrowPolygon = {
        positions: Cesium.Cartesian3.fromDegreesArray([
          117.169646,
          31.769171,
          117.194579,
          31.806466,
        ]),
        width: 10.0,
        material: Cesium.Color.RED.withAlpha(0.5),
        clampToGround: true,
      };

      let line = this.$viewer.entities.add({
        polyline: arrowPolygon,
      });

      this.$viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.PolygonGeometry({
              polygonHierarchy: {
                positions: Cesium.Cartesian3.fromDegreesArray([
                  117.204289,
                  31.763824,
                  117.228083,
                  31.791911,
                  117.218083,
                  31.763824,
                ]),
              },
            }),
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.PINK.withAlpha(0.5)
              ),
            },
          }),
          appearance: new Cesium.PerInstanceColorAppearance(),
        })
      );

      // this.$viewer.scene.primitives.add(
      //   new Cesium.Primitive({
      //     geometryInstances: new Cesium.GeometryInstance({
      //       geometry: new Cesium.PolylineGeometry({
      //         positions: Cesium.Cartesian3.fromDegreesArray([
      //           117.169646,
      //           31.769171,
      //           117.194579,
      //           31.806466,
      //           117.204579,
      //           31.826466,
      //         ]),
      //         width: 100,
      //       }),
      //       attributes: {
      //         color: Cesium.ColorGeometryInstanceAttribute.fromColor(
      //           Cesium.Color.YELLOW.withAlpha(0.5)
      //         ),
      //       },
      //     }),
      //     appearance: new Cesium.PerInstanceColorAppearance(),
      //   })
      // );
    },
  },
};
</script>

<style scoped>
</style>