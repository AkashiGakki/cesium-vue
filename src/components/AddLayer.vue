<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

export default {
  name: "AddLayer",
  mounted() {
    this.init();
    this.addLayers();
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
    // 添加图层
    addLayers() {
      // Remove default base layer
      // this.$viewer.imageryLayers.remove(this.$viewer.imageryLayers.get(0));

      // Add grid imagery
      this.$viewer.imageryLayers.addImageryProvider(
        new Cesium.GridImageryProvider()
      );

      // this.$viewer.imageryLayers.addImageryProvider(
      //   new Cesium.SingleTileImageryProvider({
      //     url: "images/bang.png",
      //     rectangle: Cesium.Rectangle.fromDegrees(-75.0, 28.0, -67.0, 29.75),
      //   })
      // );

      // this.$viewer.imageryLayers.addImageryProvider(
      //   new Cesium.ArcGisMapServerImageryProvider({
      //     url:
      //       "//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
      //     baseLayerPicker: false
      //   }),
      // );
    },
  },
};
</script>

<style scoped>
</style>