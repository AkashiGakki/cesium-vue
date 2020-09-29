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
    this.addModel();
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
    addModel() {
      let position = Cesium.Cartesian3.fromDegrees(
        -75.62808254394531,
        40.02824946899414
      );
      let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);

      let heading = Cesium.Math.toRadians(10.0);
      let pitch = Cesium.Math.toRadians(-10.0);
      let roll = Cesium.Math.toRadians(0.0);

      let headingPitchRoll = new Cesium.HeadingPitchRoll(heading, pitch, roll);
      let orientation = new Cesium.Transforms.headingPitchRollQuaternion(
        position,
        headingPitchRoll
      );

      let carModel = this.$viewer.scene.primitives.add(
        new Cesium.Model.fromGltf({
          //异步的加载模型
          url: "model3D/Truck.glb",
          scale: 3.0, //缩放
          position: position,
          orientation: orientation,
          modelMatrix: modelMatrix, //模型矩阵
        })
      );
      this.$viewer.trackedEntity = carModel;

      this.$viewer.scene.camera.setView({
        destination: new Cesium.Cartesian3.fromDegrees(
          -75.62808254394531,
          40.02624946899414,
          50.0
        ),
        orientation: {
          heading,
          pitch,
          roll,
        },
      });

      // let fighter = this.$viewer.entities.add({
      //   name: "fighter",
      //   id: "J15",
      //   model: {
      //     uri: "model3D/J15.glb",
      //     minimumPixelSize: 100,
      //     maximumScale: 1000,
      //   },
      //   position: position,
      // });

      // let particleSystem = this.$viewer.scene.primitives.add(
      //   new Cesium.ParticleSystem({
      //     image: "images/rain-particle.png",
      //     imageSize: new Cesium.Cartesian2(20, 20),
      //     startScale: 1.0,
      //     endScale: 4.0,
      //     particleLife: 1.0,
      //     speed: 5.0,
      //     emitter: new Cesium.CircleEmitter(0.5),
      //     emissionRate: 5.0,
      //     modelMatrix: fighter.computeModelMatrix(
      //       Cesium.JulianDate.now(),
      //       new Cesium.Matrix4()
      //     ),
      //     lifetime: 16.0,
      //   })
      // );
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