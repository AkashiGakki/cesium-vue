<template>
  <div class="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

export default {
  name: "Weather",
  mounted() {
    this.init();
    this.rain();
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
   // 雪景
    snow() {
      let vm = this;
      this.$viewer.terrainProvider = Cesium.createWorldTerrain();
      this.$viewer.scene.globe.depthTestAgainstTerrain = true;
      this.$viewer.scene.camera.setView({
        destination: new Cesium.Cartesian3(
          277096.634865404,
          5647834.481964232,
          2985563.7039122293
        ),
        orientation: {
          heading: 4.731089976107251,
          pitch: -0.32003481981370063,
        },
      });

      let snowGravityVector = new Cesium.Cartesian3();
      let snowUpdate = function (particle, dt) {
        dt;
        Cesium.Cartesian3.normalize(particle.position, snowGravityVector);
        Cesium.Cartesian3.multiplyByScalar(
          snowGravityVector,
          Cesium.Math.randomBetween(-30.0, -300.0),
          snowGravityVector
        );
        particle.velocity = Cesium.Cartesian3.add(
          particle.velocity,
          snowGravityVector,
          particle.velocity
        );

        let distance = Cesium.Cartesian3.distance(
          vm.$viewer.scene.camera.position,
          particle.position
        );
        if (distance > snowRadius) {
          particle.endColor.alpha = 0.0;
        } else {
          particle.endColor.alpha =
            snowSystem.endColor.alpha / (distance / snowRadius + 0.1);
        }
      };

      // 雾与大气效果
      this.$viewer.scene.skyAtmosphere.hueShift = -0.8;
      this.$viewer.scene.skyAtmosphere.saturationShift = -0.7;
      this.$viewer.scene.skyAtmosphere.brightnessShift = -0.33;

      this.$viewer.scene.fog.density = 0.001;
      this.$viewer.scene.fog.minimumBrightness = 0.8;

      let snowParticleSize = this.$viewer.scene.drawingBufferWidth / 100.0;
      let snowRadius = 100000.0;

      let snowSystem = new Cesium.ParticleSystem({
        modelMatrix: new Cesium.Matrix4.fromTranslation(
          this.$viewer.scene.camera.position
        ),
        minimumSpeed: -1.0,
        maximumSpeed: 0.0,
        lifetime: 15.0,
        emitter: new Cesium.SphereEmitter(snowRadius),
        startScale: 0.5,
        endScale: 1.0,
        // image: "images/snowflake-particle.png",
        // image: "images/snowflake.png",
        image: "images/snow.png",
        emissionRate: 1000.0,
        startColor: Cesium.Color.WHITE.withAlpha(0.0),
        endColor: Cesium.Color.WHITE.withAlpha(1.0),
        minimumImageSize: new Cesium.Cartesian2(
          snowParticleSize,
          snowParticleSize
        ),
        maximumImageSize: new Cesium.Cartesian2(
          snowParticleSize,
          snowParticleSize
        ),
        updateCallback: snowUpdate,
      });
      this.$viewer.scene.primitives.add(snowSystem);
    },
    // 雨景
    rain() {
      let vm = this;
      this.$viewer.terrainProvider = Cesium.createWorldTerrain();
      this.$viewer.scene.globe.depthTestAgainstTerrain = true;
      this.$viewer.scene.camera.setView({
        destination: new Cesium.Cartesian3(
          277096.634865404,
          5647834.481964232,
          2985563.7039122293
        ),
        orientation: {
          heading: 4.731089976107251,
          pitch: -0.32003481981370063,
        },
      });

      // rain
      this.$viewer.scene.skyAtmosphere.hueShift = -0.97;
      this.$viewer.scene.skyAtmosphere.saturationShift = 0.25;
      this.$viewer.scene.skyAtmosphere.brightnessShift = -0.4;

      this.$viewer.scene.fog.density = 0.00025;
      this.$viewer.scene.fog.minimumBrightness = 0.01;

      let rainParticleSize = this.$viewer.scene.drawingBufferWidth / 100.0;
      let rainRadius = 100000.0;

      let rainGravityScratch = new Cesium.Cartesian3();
      let rainUpdate = function (particle, dt) {
        dt;
        rainGravityScratch = Cesium.Cartesian3.normalize(
          particle.position,
          rainGravityScratch
        );
        rainGravityScratch = Cesium.Cartesian3.multiplyByScalar(
          rainGravityScratch,
          -1050.0,
          rainGravityScratch
        );

        particle.position = Cesium.Cartesian3.add(
          particle.position,
          rainGravityScratch,
          particle.position
        );

        let distance = Cesium.Cartesian3.distance(
          vm.$viewer.scene.camera.position,
          particle.position
        );
        if (distance > rainRadius) {
          particle.endColor.alpha = 0.0;
        } else {
          particle.endColor.alpha =
            rainSystem.endColor.alpha / (distance / rainRadius + 0.1);
        }
      };

      let rainSystem = new Cesium.ParticleSystem({
        modelMatrix: new Cesium.Matrix4.fromTranslation(
          this.$viewer.scene.camera.position
        ),
        speed: -1.0,
        lifetime: 15.0,
        emitter: new Cesium.SphereEmitter(rainRadius),
        startScale: 1.0,
        endScale: 0.0,
        image: "images/rain.png",
        emissionRate: 900.0,
        startColor: new Cesium.Color(0.27, 0.4, 0.6, 0.0),
        endColor: new Cesium.Color(0.27, 0.4, 0.6, 0.98),
        imageSize: new Cesium.Cartesian2(
          rainParticleSize,
          rainParticleSize * 2
        ),
        updateCallback: rainUpdate,
      });
      this.$viewer.scene.primitives.add(rainSystem);
    },

    sonwRef() {
      console.log(this.$viewer);
      let vm = this;
      this.$viewer.terrainProvider = Cesium.createWorldTerrain();
      this.$viewer.scene.globe.depthTestAgainstTerrain = true;
      this.$viewer.scene.camera.setView({
        destination: new Cesium.Cartesian3(
          277096.634865404,
          5647834.481964232,
          2985563.7039122293
        ),
        orientation: {
          heading: 4.731089976107251,
          pitch: -0.32003481981370063,
        },
      });

      var snowParticleSize = 12.0;
      var snowRadius = 100000.0;
      var minimumSnowImageSize = new Cesium.Cartesian2(
        snowParticleSize,
        snowParticleSize
      );
      var maximumSnowImageSize = new Cesium.Cartesian2(
        snowParticleSize * 2.0,
        snowParticleSize * 2.0
      );
      var snowSystem;

      var snowGravityScratch = new Cesium.Cartesian3();
      var snowUpdate = function (particle, dt) {
        dt;
        snowGravityScratch = Cesium.Cartesian3.normalize(
          particle.position,
          snowGravityScratch
        );
        Cesium.Cartesian3.multiplyByScalar(
          snowGravityScratch,
          Cesium.Math.randomBetween(-30.0, -300.0),
          snowGravityScratch
        );
        particle.velocity = Cesium.Cartesian3.add(
          particle.velocity,
          snowGravityScratch,
          particle.velocity
        );

        var distance = Cesium.Cartesian3.distance(
          vm.$viewer.scene.camera.position,
          particle.position
        );
        if (distance > snowRadius) {
          particle.endColor.alpha = 0.0;
        } else {
          particle.endColor.alpha =
            snowSystem.endColor.alpha / (distance / snowRadius + 0.1);
        }
      };

      snowSystem = new Cesium.ParticleSystem({
        modelMatrix: new Cesium.Matrix4.fromTranslation(
          vm.$viewer.scene.camera.position
        ),
        minimumSpeed: -1.0,
        maximumSpeed: 0.0,
        lifetime: 15.0,
        emitter: new Cesium.SphereEmitter(snowRadius),
        startScale: 0.5,
        endScale: 1.0,
        image: "images/snowflake-particle.png",
        emissionRate: 700.0,
        startColor: Cesium.Color.WHITE.withAlpha(0.0),
        endColor: Cesium.Color.WHITE.withAlpha(1.0),
        minimumImageSize: minimumSnowImageSize,
        maximumImageSize: maximumSnowImageSize,
        updateCallback: snowUpdate,
      });
      this.$viewer.scene.primitives.add(snowSystem);
    },
    rainRef() {
      let vm = this;
      this.$viewer.terrainProvider = Cesium.createWorldTerrain();
      this.$viewer.scene.globe.depthTestAgainstTerrain = true;
      this.$viewer.scene.camera.setView({
        destination: new Cesium.Cartesian3(
          277096.634865404,
          5647834.481964232,
          2985563.7039122293
        ),
        orientation: {
          heading: 4.731089976107251,
          pitch: -0.32003481981370063,
        },
      });

      var rainParticleSize = 15.0;
      var rainRadius = 100000.0;
      var rainImageSize = new Cesium.Cartesian2(
        rainParticleSize,
        rainParticleSize * 2.0
      );

      var rainSystem;

      var rainGravityScratch = new Cesium.Cartesian3();
      var rainUpdate = function (particle, dt) {
        dt;
        rainGravityScratch = Cesium.Cartesian3.normalize(
          particle.position,
          rainGravityScratch
        );
        rainGravityScratch = Cesium.Cartesian3.multiplyByScalar(
          rainGravityScratch,
          -1050.0,
          rainGravityScratch
        );

        particle.position = Cesium.Cartesian3.add(
          particle.position,
          rainGravityScratch,
          particle.position
        );

        var distance = Cesium.Cartesian3.distance(
          vm.$viewer.scene.camera.position,
          particle.position
        );
        if (distance > rainRadius) {
          particle.endColor.alpha = 0.0;
        } else {
          particle.endColor.alpha =
            rainSystem.endColor.alpha / (distance / rainRadius + 0.1);
        }
      };

      rainSystem = new Cesium.ParticleSystem({
        modelMatrix: new Cesium.Matrix4.fromTranslation(
          vm.$viewer.scene.camera.position
        ),
        speed: -1.0,
        lifetime: 15.0,
        emitter: new Cesium.SphereEmitter(rainRadius),
        startScale: 1.0,
        endScale: 0.0,
        image: "images/rainflake.png",
        emissionRate: 900.0,
        imageSize: rainImageSize,
        updateCallback: rainUpdate,
      });
      this.$viewer.scene.primitives.add(rainSystem);
    },

    thunderRef() {
      let vm = this;
      this.$viewer.scene.camera.setView({
        destination: new Cesium.Cartesian3.fromDegrees(121.5064, 31.247, 1000),
        orientation: {
          heading: 10,
          pitch: 0,
        },
      });

      let thunderSystem = new Cesium.ParticleSystem({
        image: "images/thunder.png",
        // image: "images/thunder_png.png",
        imageSize: new Cesium.Cartesian2(64, 64),
        startScale: 1.0,
        endScale: 4.0,
        particleLife: 1.0,
        speed: 5.0,
        emitter: new Cesium.SphereEmitter(1000.0),
        emissionRate: 7.0,
        modelMatrix: new Cesium.Matrix4.fromTranslation(
          vm.$viewer.scene.camera.position
        ),
        lifetime: 16.0,
      });

      this.$viewer.scene.skyAtmosphere.hueShift = -0.8;
      this.$viewer.scene.skyAtmosphere.saturationShift = -0.7;
      this.$viewer.scene.skyAtmosphere.brightnessShift = -0.2;

      // this.$viewer.scene.fog.density = 0.001;
      // this.$viewer.scene.fog.minimumBrightness = 0.8;

      this.$viewer.scene.primitives.add(thunderSystem);
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