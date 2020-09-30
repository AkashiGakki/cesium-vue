<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

export default {
  name: "CesiumSail",
  mounted() {
    this.init();
    this.setScene();

    // this.directionControl();

    // setTimeout(() => {
    //   this.snow();
    //   this.thunder();
    // }, 10000);
  },
  methods: {
    init() {
      let vm = this;
      let viewerOption = {
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        infoBox: false,
        selectionIndicator: false,
        scene3DOnly: true,
        shadows: true,
        shouldAnimate: true,
      };

      // your token
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MTFkZDY2NC00NjE4LTQyOTMtOTZhMS1lNzU4OWJhY2ZkNzgiLCJpZCI6MzE2NDQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTU3NTkxODV9.pkaTjYrzbEswbhOy2X4KelZpDepVSgxN7f_GVYl6BiQ";

      this.$viewer = new Cesium.Viewer(this.$refs.viewer, viewerOption);

      // 隐藏Logo
      this.$viewer.cesiumWidget.creditContainer.style.display = "none";

      // 禁止地形穿透

      // this.$viewer.scene.screenSpaceCameraController.minimumZoomDistance = 100;
      // this.$viewer.clock.onTick.addEventListener(() => {
      //   setMinCamera();
      // });
      // let setMinCamera = function () {
      //   if (vm.$viewer.camera.pitch > 0) {
      //     vm.$viewer.scene.screenSpaceCameraController.enableTilt = false;
      //   }
      // };

      let mousePosition, startMousePosition;
      let handler = new Cesium.ScreenSpaceEventHandler(this.$viewer.canvas);

      handler.setInputAction((movement) => {
        mousePosition = startMousePosition = Cesium.Cartesian3.clone(
          movement.position
        );
        handler.setInputAction(function (movement) {
          mousePosition = movement.endPosition;
          let y = mousePosition.y - startMousePosition.y;
          if (y > 0) {
            vm.$viewer.scene.screenSpaceCameraController.enableTilt = true;
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);

      setTimeout(() => {
        this.$viewer.scene.camera.flyTo({
          destination: new Cesium.Cartesian3.fromDegrees(
            -75.62808254394531,
            40.02624946899414,
            1000.0
          ),
          // complete: () => {
          //   vm.$viewer.camera.flyTo({
          //     destination: Cesium.Cartesian3.fromDegrees(
          //       -75.62808254394531,
          //       40.02624946899414,
          //       1000.0
          //     ),
          //     orientation: {
          //       heading: Cesium.Math.toRadians(-3.0),
          //       pitch: Cesium.Math.toRadians(1.0),
          //       roll: Cesium.Math.toRadians(0.0),
          //     },
          //     duration: 3,
          //   });
          // },

          complete: setTimeout(() => {
            vm.$viewer.scene.camera.flyTo({
              destination: new Cesium.Cartesian3.fromDegrees(
                -75.62808254394531,
                40.02624946899414,
                1000.0
              ),
              orientation: {
                heading: Cesium.Math.toRadians(-3.0),
                pitch: Cesium.Math.toRadians(1.0),
                roll: Cesium.Math.toRadians(0.0),
              },
            });
          }, 2000),
        });
      }, 3000);
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
          imageSize: options.imageSize,
          minimumImageSize: options.minimumImageSize,
          maximumImageSize: options.maximumImageSize,
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

      let longitude = -75.62808254394531;
      let latitude = 40.02624946899414;
      let height = 1000.0;

      let modelOptions = {
        name: "model_1",
        id: "model_1",
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        model: {
          uri: "model3D/J15.glb",
          minimumPixelSize: 70,
          maximumScale: 1000.0,
        },
      };

      let model_1 = this.createEntity(modelOptions);
      // this.$viewer.zoomTo(model_1, new Cesium.HeadingPitchRange(0, -1, 100));
      // this.$viewer.trackedEntity = model_1;

      let modelOptions_2 = {
        name: "model_2",
        id: "model_2",
        position: Cesium.Cartesian3.fromDegrees(-75.6275, 40.026, height),
        model: {
          uri: "model3D/J15.glb",
          minimumPixelSize: 70,
          maximumScale: 1000.0,
        },
      };
      let model_2 = this.createEntity(modelOptions_2);

      let modelOptions_3 = {
        name: "model_3",
        id: "model_3",
        position: Cesium.Cartesian3.fromDegrees(-75.628, 40.026, 1010),
        model: {
          uri: "model3D/J15.glb",
          minimumPixelSize: 70,
          maximumScale: 1000.0,
        },
      };
      let model_3 = this.createEntity(modelOptions_3);

      let modelOptions_4 = {
        name: "model_4",
        id: "model_4",
        position: Cesium.Cartesian3.fromDegrees(-75.627, 40.027, 950),
        model: {
          uri: "model3D/J15.glb",
          minimumPixelSize: 70,
          maximumScale: 1000.0,
        },
      };
      let model_4 = this.createEntity(modelOptions_4);

      let modelOptions_5 = {
        name: "model_5",
        id: "model_5",
        position: Cesium.Cartesian3.fromDegrees(-75.628, 40.027, 950),
        model: {
          uri: "model3D/J15.glb",
          minimumPixelSize: 70,
          maximumScale: 1000.0,
        },
      };
      let model_5 = this.createEntity(modelOptions_5);

      let modelOptions_6 = {
        name: "model_6",
        id: "model_6",
        position: Cesium.Cartesian3.fromDegrees(-75.6283, 40.027, 980),
        model: {
          uri: "model3D/J15.glb",
          minimumPixelSize: 70,
          maximumScale: 1000.0,
        },
      };
      let model_6 = this.createEntity(modelOptions_6);

      let modelOptions_7 = {
        name: "model_7",
        id: "model_7",
        position: Cesium.Cartesian3.fromDegrees(-75.6276, 40.027, 980),
        model: {
          uri: "model3D/J15.glb",
          minimumPixelSize: 70,
          maximumScale: 1000.0,
        },
      };
      let model_7 = this.createEntity(modelOptions_7);

      this.controlModel(
        "model_1",
        {
          longitude: -75.62808254394531,
          latitude: 40.02624946899414,
          height: 1000.0,
        },
        {
          longitude: -75.63,
          latitude: 40.03,
          height: 1000.0,
        },
        70
      );

      this.controlModel(
        "model_2",
        {
          longitude: -75.6275,
          latitude: 40.026,
          height: 1000.0,
        },
        {
          longitude: -75.63,
          latitude: 40.036,
          height: 1000.0,
        },
        100
      );

      this.controlModel(
        "model_3",
        {
          longitude: -75.628,
          latitude: 40.026,
          height: 1010.0,
        },
        {
          longitude: -75.63,
          latitude: 40.036,
          height: 900.0,
        },
        100
      );

      this.controlModel(
        "model_4",
        {
          longitude: -75.627,
          latitude: 40.027,
          height: 950.0,
        },
        {
          longitude: -75.63,
          latitude: 40.036,
          height: 1000.0,
        },
        100
      );

      this.controlModel(
        "model_5",
        {
          longitude: -75.628,
          latitude: 40.027,
          height: 950.0,
        },
        {
          longitude: -75.63,
          latitude: 40.036,
          height: 1000.0,
        },
        100
      );

      this.controlModel(
        "model_6",
        {
          longitude: -75.6283,
          latitude: 40.027,
          height: 980.0,
        },
        {
          longitude: -75.63,
          latitude: 40.036,
          height: 1000.0,
        },
        100
      );

      this.controlModel(
        "model_7",
        {
          longitude: -75.6276,
          latitude: 40.027,
          height: 980.0,
        },
        {
          longitude: -75.63,
          latitude: 40.036,
          height: 1000.0,
        },
        100
      );

      // 添加粒子效果
      let particleOptions_1 = {
        show: true,
        image: "images/bang.png",
        // imageSize: new Cesium.Cartesian2(20.0, 20.0),
        minimumImageSize: new Cesium.Cartesian2(10.0, 10.0),
        maximumImageSize: new Cesium.Cartesian2(15.0, 15.0),
        color: Cesium.Color.YELLOW.withAlpha(0.3),
        emissionRate: 5.0,
        emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(10.0)),
        lifetime: 15.0,
        emitterModelMatrix: new Cesium.Matrix4.fromTranslationQuaternionRotationScale(
          new Cesium.Cartesian3(0.0, -11.0, 1.0),
          new Cesium.Quaternion(1, 0, 0, 1),
          new Cesium.Cartesian3(7.0, 6.0, 5.0),
          new Cesium.Matrix4()
        ),
      };

      setTimeout(() => {
        this.createParticleSystems(particleOptions_1, "model_1");
        this.createParticleSystems(particleOptions_1, "model_2");
        this.createParticleSystems(particleOptions_1, "model_3");
        this.createParticleSystems(particleOptions_1, "model_4");
        this.createParticleSystems(particleOptions_1, "model_5");
        this.createParticleSystems(particleOptions_1, "model_6");
        this.createParticleSystems(particleOptions_1, "model_7");
      }, 6000);
    },
    directionControl() {
      let scene = this.$viewer.scene;
      let canvas = this.$viewer.canvas;
      canvas.setAttribute("tabindex", "0");
      canvas.onclick = function () {
        canvas.focus();
      };
      let ellipsoid = this.$viewer.scene.globe.ellipsoid;

      scene.screenSpaceCameraController.enableRotate = false;
      scene.screenSpaceCameraController.enableTranslate = false;
      scene.screenSpaceCameraController.enableZoom = false;
      scene.screenSpaceCameraController.enableTilt = false;
      scene.screenSpaceCameraController.enableLook = false;

      let startMousePosition;
      let mousePosition;
      let flags = {
        looking: false,
        moveForward: false,
        moveBackward: false,
        moveUp: false,
        moveDown: false,
        moveLeft: false,
        moveRight: false,
      };

      let handler = new Cesium.ScreenSpaceEventHandler(canvas);

      handler.setInputAction(function (movement) {
        flags.looking = true;
        mousePosition = startMousePosition = Cesium.Cartesian3.clone(
          movement.position
        );
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

      handler.setInputAction(function (movement) {
        mousePosition = movement.endPosition;
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

      handler.setInputAction(function (position) {
        flags.looking = false;
      }, Cesium.ScreenSpaceEventType.LEFT_UP);

      function getFlagForKeyCode(keyCode) {
        switch (keyCode) {
          case "W".charCodeAt(0):
            return "moveForward";
          case "S".charCodeAt(0):
            return "moveBackward";
          case "Q".charCodeAt(0):
            return "moveUp";
          case "E".charCodeAt(0):
            return "moveDown";
          case "D".charCodeAt(0):
            return "moveRight";
          case "A".charCodeAt(0):
            return "moveLeft";

          case 37:
            return "moveLeft";
          case 38:
            return "moveUp";
          case 39:
            return "moveRight";
          case 40:
            return "moveDown";

          default:
            return undefined;
        }
      }

      document.addEventListener(
        "keydown",
        function (e) {
          let flagName = getFlagForKeyCode(e.keyCode);
          if (typeof flagName !== "undefined") {
            flags[flagName] = true;
          }
        },
        false
      );

      document.addEventListener(
        "keyup",
        function (e) {
          let flagName = getFlagForKeyCode(e.keyCode);
          if (typeof flagName !== "undefined") {
            flags[flagName] = false;
          }
        },
        false
      );

      this.$viewer.clock.onTick.addEventListener((clock) => {
        let camera = this.$viewer.camera;

        if (flags.looking) {
          let width = canvas.clientWidth;
          let height = canvas.clientHeight;

          let x = (mousePosition.x - startMousePosition.x) / width;
          let y = -(mousePosition.y - startMousePosition.y) / height;

          let lookFactor = 0.05;
          camera.lookRight(x * lookFactor);
          camera.lookUp(y * lookFactor);
        }

        let cameraHeight = ellipsoid.cartesianToCartographic(camera.position)
          .height;
        let moveRate = cameraHeight / 100.0;

        if (flags.moveForward) {
          camera.moveForward(moveRate);
        }
        if (flags.moveBackward) {
          camera.moveBackward(moveRate);
        }
        if (flags.moveUp) {
          camera.moveUp(moveRate);
        }
        if (flags.moveDown) {
          camera.moveDown(moveRate);
        }
        if (flags.moveLeft) {
          camera.moveLeft(moveRate);
        }
        if (flags.moveRight) {
          camera.moveRight(moveRate);
        }
      });
    },
    snow() {
      let vm = this;

      let snowParticleSize = 12.0;
      let snowRadius = 1000000.0;
      let minimumSnowImageSize = new Cesium.Cartesian2(
        snowParticleSize,
        snowParticleSize
      );
      let maximumSnowImageSize = new Cesium.Cartesian2(
        snowParticleSize * 2.0,
        snowParticleSize * 2.0
      );
      let snowSystem;

      let snowGravityScratch = new Cesium.Cartesian3();
      let snowUpdate = function (particle, dt) {
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
        image: "images/snow.png",
        emissionRate: 700.0,
        startColor: Cesium.Color.WHITE.withAlpha(0.0),
        endColor: Cesium.Color.WHITE.withAlpha(1.0),
        minimumImageSize: minimumSnowImageSize,
        maximumImageSize: maximumSnowImageSize,
        updateCallback: snowUpdate,
      });
      this.$viewer.scene.primitives.add(snowSystem);
    },
    thunder() {
      let vm = this;
      // this.$viewer.scene.camera.setView({
      //   destination: new Cesium.Cartesian3.fromDegrees(-75.62808254394531,  40.02624946899414, 1000),
      //   orientation: {
      //     heading: 10,
      //     pitch: 0,
      //   },
      // });

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
</style>