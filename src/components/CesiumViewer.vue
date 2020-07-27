<template>
  <div id="cesiumContainer" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

export default {
  name: "CesiumViewer",
  mounted() {
    // 初始化
    this.init();

    // 添加图层
    // this.addLayers();

    // 添加地形
    this.addTerrain();
  },
  methods: {
    // 初始化
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
      };
      // your token
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MTFkZDY2NC00NjE4LTQyOTMtOTZhMS1lNzU4OWJhY2ZkNzgiLCJpZCI6MzE2NDQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTU3NTkxODV9.pkaTjYrzbEswbhOy2X4KelZpDepVSgxN7f_GVYl6BiQ";

      this.$viewer = new Cesium.Viewer(this.$refs.viewer, viewerOption);

      // 隐藏Logo
      this.$viewer.cesiumWidget.creditContainer.style.display = "none";
    },
    // 添加图层
    addLayers() {
      // Remove default base layer
      // this.$viewer.imageryLayers.remove(this.$viewer.imageryLayers.get(0));

      // Add grid imagery
      this.$viewer.imageryLayers.addImageryProvider(
        new Cesium.GridImageryProvider()
      );
    },
    // 添加地形
    addTerrain() {
      this.$viewer.terrainProvider = Cesium.createWorldTerrain({
        requestWaterMask: true,         // required for water effects
        requestVertexNormals: true,     // required for terrain lighting
      });

      // Enable depth testing so things behind the terrain disappear.
      this.$viewer.scene.globe.depthTestAgainstTerrain = true;
    },
  },
};
</script>

<style>
#cesiumContainer {
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
