<template>
  <div class="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

export default {
  name: "SetScene",
  mounted() {
    this.init();
    this.setScene();
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
    // 创建实体
    createEntity(entity) {
      let entities = this.$viewer.entities.add({
        name: entity.name,
        id: entity.id,
        // availability: entity.availability,
        // show: entity.hasOwnProperty(entity.show) ? entity.show : true,
        show: true,
        position: entity.position,
        orientation: entity.orientation,
        model: entity.model,
        path: entity.path,
      });
      return entities;
    },
    // 创建粒子效果
    createParticleSystems(options, bindId) {
      let entity = this.$viewer.entities.getById(bindId);
      let particleSystem = this.$viewer.scene.primitives.add(
        new Cesium.ParticleSystem({
          // show: options.hasOwnProperty(options.show) ? options.show : true,
          show: true,
          image: options.image,
          imageSize: new Cesium.Cartesian2(30.0, 30.0),
          color: options.color,
          emissionRate: options.emissionRate,
          emitter: options.emitter,
          modelMatrix: entity.computeModelMatrix(
            Cesium.JulianDate.now(),
            new Cesium.Matrix4()
          ),
          emitterModelMatrix: options.emitterModelMatrix,
          lifetime: options.lifetime,
          speed: options.speed,
        })
      );

      let index = this.$viewer.scene.primitives._primitives.indexOf(
        particleSystem
      );

      // 绑定多个粒子效果
      entity.particles = [index];

      return particleSystem;
    },
    // 更新实体控制(v0.1)
    controlEntity(start, stop, speed = 1) {
      // let vm = this;
      let longitude = start.longitude;
      let latitude = start.latitude;
      let height = start.height;

      // let position = new Cesium.Cartesian3.fromDegrees(
      //   longitude,
      //   latitude,
      //   height
      // );

      let interval = setInterval(() => {
        // 前进方向
        latitude += 0.000001 * speed;

        // 获取实体实例
        let fighter = this.$viewer.entities.getById("fighter");

        fighter.position = new Cesium.Cartesian3.fromDegrees(
          longitude,
          latitude,
          height
        );

        // 获取粒子效果实例
        let particles = [this.$viewer.scene.primitives.get(fighter.particles)];

        for (const particle of particles) {
          particle.modelMatrix = fighter.computeModelMatrix(
            Cesium.JulianDate.now(),
            new Cesium.Matrix4()
          );
        }

        if (latitude >= stop.latitude) {
          clearInterval(interval);
        }
      }, 1000 / 60);
    },
    // 设置场景
    setScene() {
      let _this = this;
      let fighterOptions = {
        name: "fighter",
        id: "fighter",
        position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883, 8000.0),
        model: {
          uri: "model3D/J15.glb",
          minimumPixelSize: 70,
          maximumScale: 1000.0,
        },
      };

      // let fighter = this.createEntity(fighterOptions);

      // this.$viewer.zoomTo(fighter, new Cesium.HeadingPitchRange(-1, -0.3, 35));

      let particleOptions = {
        show: true,
        image: "images/fire.png",
        imageSize: new Cesium.Cartesian2(30.0, 30.0),
        color: Cesium.Color.YELLOW.withAlpha(0.4),
        emissionRate: 15.0,
        emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(30.0)),
        lifetime: 16.0,
        emitterModelMatrix: new Cesium.Matrix4.fromTranslationQuaternionRotationScale(
          new Cesium.Cartesian3(0.0, -11.0, 1.0),
          new Cesium.Quaternion(1, 0, 0, 1),
          new Cesium.Cartesian3(7.0, 6.0, 5.0),
          new Cesium.Matrix4()
        ),
      };

      // let fighterParticle = this.createParticleSystems(
      //   particleOptions,
      //   "fighter"
      // );

      const promise = new Promise((resolve, rejcet) => {
        let fighter = this.createEntity(fighterOptions);
        resolve(fighter);
        rejcet();
      });

      promise.then((fighter) => {
        this.$viewer.zoomTo(
          fighter,
          new Cesium.HeadingPitchRange(-1, -0.3, 35)
        );
        setTimeout(() => {
          const promise2 = new Promise((resolve, rejcet) => {
            let fighterParticle = this.createParticleSystems(
              particleOptions,
              "fighter"
            );
            resolve(fighterParticle);
            rejcet();
          });

          promise2.then(() => {
            let start = {
              longitude: -75.59777,
              latitude: 40.03883,
              height: 8000,
            };
            let stop = {
              longitude: -75.59777,
              latitude: 40.0403,
              height: 8000,
            };

            _this.controlEntity(start, stop, 2);
          });

          setTimeout(() => {
            _this.$viewer.zoomTo(
              fighter,
              new Cesium.HeadingPitchRange(-1, -0.3, 150)
            );
            // _this.$viewer.scene.camera.flyTo({
            //   destination: fighter.position._value,
            //   orientation: {
            //     heading: Cesium.Math.toRadians(0.0),
            //     pitch: Cesium.Math.toRadians(15.0),
            //     roll: 0.0,
            //   },
            // });
            // console.log("fighter", fighter);
          }, 5000);
        }, 3000);
      });
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