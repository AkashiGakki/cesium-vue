<template>
  <div class="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

export default {
  name: "ControlModel",
  mounted() {
    this.init();
    this.setScene();
    this.drawLine();
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
      let vm = this;
      let entities = vm.$viewer.entities.add({
        name: entity.name,
        id: entity.id,
        // availability: entity.availability,
        show: entity.hasOwnProperty(entity.show) ? entity.show : true,
        position: entity.position,
        orientation: entity.orientation,
        model: entity.model,
        path: entity.path,
      });
      return entities;
    },
    // 创建粒子效果
    createParticleSystems(options, bindId) {
      let vm = this;
      let entity = vm.$viewer.entities.getById(bindId);
      let particleSystem = vm.$viewer.scene.primitives.add(
        new Cesium.ParticleSystem({
          show: options.hasOwnProperty(options.show) ? options.show : true,
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

      let index = vm.$viewer.scene.primitives._primitives.indexOf(
        particleSystem
      );

      // entity.particle = index;

      // 绑定多个粒子效果
      entity.particles = [index];

      return particleSystem;
    },
    // 控制模型飞行
    controlModel(id, start, stop, duration) {
      let vm = this;
      let longitude = start.longitude;
      let latitude = start.latitude;
      let height = start.height;

      // 方向判断
      let coord = {};
      if (stop.longitude > start.longitude) {
        coord.right = true;
        coord.left = false;
      } else if (stop.longitude < start.longitude) {
        coord.right = false;
        coord.left = true;
      }
      if (stop.latitude > start.latitude) {
        coord.up = true;
        coord.down = false;
      } else if (stop.latitude < start.latitude) {
        coord.up = false;
        coord.down = true;
      }
      // console.log("coord", coord);

      let velocity_long =
        Math.abs(Math.abs(stop.longitude) - Math.abs(start.longitude)) /
        (duration * 1000);
      let velocity_lat =
        Math.abs(Math.abs(stop.latitude) - Math.abs(start.latitude)) /
        (duration * 1000);

      let interval = setInterval(() => {
        if (coord.right) {
          longitude += velocity_long * (1000 / 60);
        } else {
          longitude -= velocity_long * (1000 / 60);
        }
        if (coord.up) {
          latitude += velocity_lat * (1000 / 60);
        } else {
          latitude -= velocity_lat * (1000 / 60);
        }

        // 获取实体实例
        let entity = vm.$viewer.entities.getById(id);

        entity.position = new Cesium.Cartesian3.fromDegrees(
          longitude,
          latitude,
          height
        );

        // 获取粒子效果实例
        if (entity.particles) {
          let particles = [vm.$viewer.scene.primitives.get(entity.particles)];

          for (const particle of particles) {
            particle.modelMatrix = entity.computeModelMatrix(
              Cesium.JulianDate.now(),
              new Cesium.Matrix4()
            );
          }
        }

        if (coord.right && longitude >= stop.longitude) {
          clearInterval(interval);
        } else if (coord.left && longitude <= stop.longitude) {
          clearInterval(interval);
        }
        if (coord.up && latitude >= stop.latitude) {
          clearInterval(interval);
        } else if (coord.down && latitude <= stop.latitude) {
          clearInterval(interval);
        }
      }, 1000 / 60);
    },
    setScene() {
      let vm = this;

      let longitude = 75.59777;
      let latitude = 40.0367;
      let height = 80000.0;

      let fighterOptions = {
        name: "fighter",
        id: "fighter",
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        model: {
          uri: "model3D/J15.glb",
          minimumPixelSize: 70,
          maximumScale: 1000.0,
        },
      };

      let particleOptions = {
        show: true,
        image: "images/explosion.png",
        imageSize: new Cesium.Cartesian2(30.0, 30.0),
        color: Cesium.Color.YELLOW,
        emissionRate: 5.0,
        emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(30.0)),
        lifetime: 3.0,
        emitterModelMatrix: new Cesium.Matrix4.fromTranslationQuaternionRotationScale(
          new Cesium.Cartesian3(0.0, -15.0, 1.0),
          new Cesium.Quaternion(1, 0, 0, 1),
          new Cesium.Cartesian3(7.0, 6.0, 5.0),
          new Cesium.Matrix4()
        ),
      };

      let start = {
        longitude: 75.59777,
        latitude: 40.0367,
        height: 80000,
      };
      let stop = {
        longitude: 75.598,
        latitude: 40.037,
        height: 80000,
      };

      // up
      // let stop = {
      //   longitude: 75.59777,
      //   latitude: 40.037,
      //   height: 80000
      // };

      // down
      // let stop = {
      //   longitude: 75.59777,
      //   latitude: 40.0364,
      //   height: 80000
      // };

      // right
      // let stop = {
      //   longitude: 75.598,
      //   latitude: 40.0367,
      //   height: 8000
      // };

      // left
      // let stop = {
      //   longitude: 75.5975,
      //   latitude: 40.0367,
      //   height: 80000
      // };

      let duration = 5;

      let newFighterOptions = {
        name: "fighter2",
        id: "fighter2",
        position: Cesium.Cartesian3.fromDegrees(75.598, 40.037, 8000),
        model: {
          uri: "static/J15.glb",
          minimumPixelSize: 70,
          maximumScale: 1000.0,
        },
      };

      let fighter = this.createEntity(fighterOptions);
      // console.log("fighter", fighter);

      // 俯视
      vm.$viewer.zoomTo(fighter, new Cesium.HeadingPitchRange(0, -1, 100));
      
      // 侧视
      // vm.$viewer.zoomTo(fighter, new Cesium.HeadingPitchRange(-0.5, -0.3, 100));

      setTimeout(() => {
        this.controlModel("fighter", start, stop, duration);
      }, 5000);
    },
    // 飞行轨迹
    drawLine() {
      let vm = this;
      let line = vm.$viewer.entities.add({
        name: "line",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            75.59777,
            40.0367,
            80000,
            75.598,
            40.037,
            80000,
          ]),
          width: 5,
          material: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.ORANGE,
            outlineWidth: 2,
            outlineColor: Cesium.Color.RED,
          }),
        },
      });

      let up = vm.$viewer.entities.add({
        name: "up",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            75.59777,
            40.0367,
            80000,
            75.59777,
            40.037,
            80000,
          ]),
          width: 5,
          material: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.PURPLE,
            outlineWidth: 2,
            outlineColor: Cesium.Color.PURPLE,
          }),
        },
      });

      let down = vm.$viewer.entities.add({
        name: "down",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            75.59777,
            40.0367,
            80000,
            75.59777,
            40.0364,
            80000,
          ]),
          width: 5,
          material: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.PURPLE,
            outlineWidth: 2,
            outlineColor: Cesium.Color.PURPLE,
          }),
        },
      });

      let right = vm.$viewer.entities.add({
        name: "right",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            75.59777,
            40.0367,
            80000,
            75.598,
            40.0367,
            80000,
          ]),
          width: 5,
          material: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.PURPLE,
            outlineWidth: 2,
            outlineColor: Cesium.Color.PURPLE,
          }),
        },
      });

      let left = vm.$viewer.entities.add({
        name: "left",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            75.59777,
            40.0367,
            80000,
            75.5975,
            40.0367,
            80000,
          ]),
          width: 5,
          material: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.PURPLE,
            outlineWidth: 2,
            outlineColor: Cesium.Color.PURPLE,
          }),
        },
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