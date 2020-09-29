<template>
  <div class="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

export default {
  name: "ConfigScene",
  mounted() {
    this.init();
    this.configScene();
  },
  methods: {
    init() {
      let viewerOption = {
        geocoder: false, // 地理位置搜索控件
        homeButton: false, // 首页跳转控件
        sceneModePicker: false, // 2D,3D和Columbus View切换控件
        baseLayerPicker: false, // 三维地图底图切换控件
        navigationHelpButton: false, // 帮助提示控件
        animation: false, // 视图动画播放速度控件
        // creditsDisplay: false,       // 版权商标和数据源
        timeline: false, // 时间轴控件
        fullscreenButton: false, // 全屏控件
        infoBox: false, // 点击显示窗口控件
        selectionIndicator: false, // 实体对象选择框控件
        scene3DOnly: true, // 仅3D渲染，节省GPU内存
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
    // 配置视窗
    configScene() {
      // Enable lighting based on sun/moon positions(激活基于太阳位置的光照)
      this.$viewer.scene.globe.enableLighting = true;

      // Create an initial camera view
      let initialPosition = new Cesium.Cartesian3.fromDegrees(
        -73.998114468289017509,
        40.674512895646692812,
        2631.082799425431
      );
      let initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(
        7.1077496389876024807,
        -31.987223091598949054,
        0.025883251314954971306
      );
      let homeCameraView = {
        destination: initialPosition,
        orientation: {
          heading: initialOrientation.heading,
          pitch: initialOrientation.pitch,
          roll: initialOrientation.roll,
        },
      };
      // Set the initial view
      this.$viewer.scene.camera.setView(homeCameraView);
    },
  },
};
</script>

<style scoped >
.container {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>