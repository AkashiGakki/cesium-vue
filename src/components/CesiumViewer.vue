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
    // this.addTerrain();

    // 配置视窗
    // this.configScene();

    // 加载实体
    // this.loadEntities();
    this.addEntities();
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
        shadows: true,
        shouldAnimate: true,
      };

      //   console.log('this.$refs.viewer', this.$refs.viewer);
      //   console.log('this.$viewer', this.$viewer);

      // your token
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MTFkZDY2NC00NjE4LTQyOTMtOTZhMS1lNzU4OWJhY2ZkNzgiLCJpZCI6MzE2NDQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTU3NTkxODV9.pkaTjYrzbEswbhOy2X4KelZpDepVSgxN7f_GVYl6BiQ";

      this.$viewer = new Cesium.Viewer(this.$refs.viewer, viewerOption);

      //   console.log('this.$refs.viewer', this.$refs.viewer);
      //   console.log('this.$viewer', this.$viewer);

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
        requestWaterMask: true, // required for water effects
        requestVertexNormals: true, // required for terrain lighting
      });

      // Enable depth testing so things behind the terrain disappear.
      this.$viewer.scene.globe.depthTestAgainstTerrain = true;

      this.$viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromRadians(
          -2.6399828792482234,
          1.0993550795541742,
          5795
        ),
        orientation: {
          heading: 3.8455,
          pitch: -0.4535,
          roll: 0.0,
        },
      });
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
    // 加载实体
    loadEntities() {
      //   let vm = this;
      let position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 0);

      let heading = Cesium.Math.toRadians(135);
      let pitch = 0;
      let roll = 0;
      let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
      let orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position,
        hpr
      );

      let entity = this.$viewer.entities.add({
        name: 'J15',
        position: position,
        orientation: orientation,
        model: {
          uri: 'static/J15.glb',
          minimumPixelSize: 128,
          maximumScale: 20000,
        },
      });
      this.$viewer.trackedEntity = entity;
    },
    addEntities() {
      let fighter = this.$viewer.entities.add({
        name: 'fighter',
        id: 'J15',
        model: {
          uri: "../../static/J15.glb",
          minimumPixelSize: 100,
          maximumScale: 1000,
        },
        position: Cesium.Cartesian3.fromDegrees(-110.345, 30, 60000)
      })
      this.$viewer.trackedEntity = fighter;
    }
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
