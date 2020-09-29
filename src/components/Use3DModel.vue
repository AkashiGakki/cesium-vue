<template>
  <div class="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

export default {
  name: "AddLayer",
  mounted() {
    this.init();
    this.addEntities();
    this.moveEneity();
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
    // 添加模型
    addEntities() {
      let fighter = this.$viewer.entities.add({
        name: "fighter",
        id: "J15",
        model: {
          uri: "model3D/J15.glb",
          minimumPixelSize: 100,
          maximumScale: 1000,
        },
        position: Cesium.Cartesian3.fromDegrees(-110.345, 30, 70000),
      });
      // this.$viewer.trackedEntity = fighter;
      this.$viewer.zoomTo(fighter, new Cesium.HeadingPitchRange(-1, -0.3, 35));
    },
    // 移动模型
    moveEneity() {
      let fighter = this.$viewer.entities.getById("J15");

      let longitude = -110.345;
      let latitude = 30.0;
      let height = 70000;

      this.$viewer.zoomTo(fighter, new Cesium.HeadingPitchRange(-1, -0.3, 350));

      let interval = setInterval(() => {
        latitude += 0.000001;

        fighter.position = new Cesium.Cartesian3.fromDegrees(
          longitude,
          latitude,
          height
        );
        if (latitude >= 30.0003) {
          clearInterval(interval);
        }
      }, 1000 / 60);

      setTimeout(() => {
        let interval2 = setInterval(() => {
          latitude += 0.000004;

          fighter.position = new Cesium.Cartesian3.fromDegrees(
            longitude,
            latitude,
            height
          );
          if (latitude >= 30.0005) {
            clearInterval(interval2);
          }
        });
      }, 3000);
    },
  },
};
</script>

<style scoped>
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