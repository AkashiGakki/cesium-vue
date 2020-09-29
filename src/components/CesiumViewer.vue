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

    this.use3DModel();
    // this.useParticle();
  },
  methods: {
    // 初始化
    init() {
      // let clock = new Cesium.Clock({
      //   startTime: Cesium.JulianDate.now(),
      //   currentTime: Cesium.JulianDate.now(),
      //   stopTime: Cesium.JulianDate.addDays(Cesium.JulianDate.now(), 1, new Cesium.JulianDate()),
      //   clockRange: Cesium.ClockRange.LOOP_STOP,
      //   clockStep: Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
      //   multiplier: 9000,
      //   shouldAnimate: true
      // });

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
        // clockViewModel: new Cesium.ClockViewModel(clock)
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

      // this.$viewer.scene.globe.enableLighting = true;
    },

    

    use3DModel() {
      // let position = Cesium.Cartesian3.fromDegrees(
      //   -75.62808254394531,
      //   40.02824946899414
      // );
      // let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);

      // let heading = Cesium.Math.toRadians(-10.0);
      // let pitch = Cesium.Math.toRadians(0.0);
      // let roll = Cesium.Math.toRadians(0.0);

      // let headingPitchRoll = new Cesium.HeadingPitchRoll(heading, pitch, roll);
      // let orientation = new Cesium.Transforms.headingPitchRollQuaternion(
      //   position,
      //   headingPitchRoll
      // );

      var start = Cesium.JulianDate.fromDate(new Date(2020, 9, 27, 16));
      var stop = Cesium.JulianDate.addSeconds(
        start,
        120,
        new Cesium.JulianDate()
      );

      var pos1 = Cesium.Cartesian3.fromDegrees(
        -75.15787310614596,
        39.97862668312678
      );
      var pos2 = Cesium.Cartesian3.fromDegrees(
        -75.1633691390455,
        39.95355089912078
      );
      var position = new Cesium.SampledPositionProperty();

      position.addSample(start, pos1);
      position.addSample(stop, pos2);

      let carModel = this.$viewer.entities.add({
        name: "Truck",
        id: "Truck",
        model: {
          uri: "model3D/Truck.glb",
          minimumPixelSize: 100,
          maximumScale: 1000,
        },
        position: position,
        orientation: new Cesium.VelocityOrientationProperty(position),
        // orientation: orientation,
        // modelMatrix: modelMatrix,
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: start,
            stop: stop,
          }),
        ]),
      });
      this.$viewer.trackedEntity = carModel;

      // this.$viewer.scene.camera.setView({
      //   destination: new Cesium.Cartesian3.fromDegrees(
      //     // -75.1633691390455,
      //     // 39.97862668312678,

      //     -75.62808254394531,
      //     40.02624946899414,
      //     20.0
      //   ),
      //   // orientation: {
      //   //   heading,
      //   //   pitch,
      //   //   roll,
      //   // },
      // });
    },
    useParticle() {
      // let vm = this;
      let model = this.$viewer.entities.getById("Truck");
      let particleSystem = this.$viewer.scene.primitives.add(
        new Cesium.ParticleSystem({
          image: "images/smoke.png",

          startColor: Cesium.Color.LIGHTSEAGREEN.withAlpha(0.7),
          endColor: Cesium.Color.WHITE.withAlpha(0.0),

          startScale: 1.0,
          endScale: 4.0,

          particleLife: 1.0,

          minimumSpeed: 1.0,
          maximumSpeed: 4.0,

          imageSize: new Cesium.Cartesian2(25, 25),
          emissionRate: 5.0,
          lifetime: 16.0,

          emitter: new Cesium.CircleEmitter(0.5),

          modelMatrix: model.computeModelMatrix(
            Cesium.JulianDate.now(),
            new Cesium.Matrix4()
          ),
          emitterModelMatrix: new Cesium.Matrix4.fromTranslationQuaternionRotationScale(
            new Cesium.Cartesian3(-4.0, 0.0, 2.0),
            new Cesium.Quaternion(0, 0, 0, 1),
            new Cesium.Cartesian3(7.0, 6.0, 5.0),
            new Cesium.Matrix4()
          ),
          // emitterModelMatrix: vm.computeEmitterModelMatrix,

          bursts: [
            // these burst will occasionally sync to create a multicolored effect
            new Cesium.ParticleBurst({
              time: 5.0,
              minimum: 10,
              maximum: 100,
            }),
            new Cesium.ParticleBurst({
              time: 10.0,
              minimum: 50,
              maximum: 100,
            }),
            new Cesium.ParticleBurst({
              time: 15.0,
              minimum: 200,
              maximum: 300,
            }),
          ],
        })
      );

      particleSystem;
    },
    computeEmitterModelMatrix() {
      let emitterModelMatrix = new Cesium.Matrix4();
      let translation = new Cesium.Cartesian3();
      let rotation = new Cesium.Quaternion();
      let hpr = new Cesium.HeadingPitchRoll();
      let trs = new Cesium.TranslationRotationScale();
      hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr);
      trs.translation = Cesium.Cartesian3.fromElements(
        -4.0,
        0.0,
        1.4,
        translation
      );
      trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

      return Cesium.Matrix4.fromTranslationRotationScale(
        trs,
        emitterModelMatrix
      );
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
