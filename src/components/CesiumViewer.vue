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

    // 添加模型
    // this.addEntities();

    // 移动模型
    // this.moveEneity();

    // 调整实体位置
    // this.adjustPosition();

    // 设置场景
    this.setScene();
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
        name: "J15",
        position: position,
        orientation: orientation,
        model: {
          uri: "model3D/J15.glb",
          minimumPixelSize: 128,
          maximumScale: 20000,
        },
      });

      // this.$viewer.trackedEntity = entity;
      entity.show = false;

      let box = this.$viewer.entities.add({
        name: "box",
        id: "box",
        position: Cesium.Cartesian3.fromDegrees(-90.0, 40.0, 300000.0),
        box: {
          dimensions: new Cesium.Cartesian3(40000.0, 30000.0, 50000.0),
          material: Cesium.Color.YELLOW.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.BLACK,
        },
      });

      // this.$viewer.zoomTo(box);
      box.show = false;

      // 多边形
      let polygon = this.$viewer.entities.add({
        name: "正方形",
        id: "square",
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray([
            -109.080842,
            45.002073,
            -105.91517,
            45.002073,
            -104.058488,
            44.996596,
            -104.053011,
            43.002989,
            -104.053011,
            41.003906,
            -105.728954,
            40.998429,
            -107.919731,
            41.003906,
            -109.04798,
            40.998429,
            -111.047063,
            40.998429,
            -111.047063,
            42.000709,
            -111.047063,
            44.476286,
            -111.05254,
            45.002073,
          ]),
          height: 0,
          material: Cesium.Color.RED.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.BLACK,
        },
      });

      // this.$viewer.zoomTo(polygon);
      polygon.show = false;

      // 三角形
      let triangle = this.$viewer.entities.add({
        name: "三角形",
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray([
            140.0,
            40.0,
            140.0,
            35.0,
            135.0,
            35.0,
          ]),
          perPositionHeight: true,
          material: Cesium.Color.PURPLE.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.PURPLE,
        },
      });

      // this.$viewer.zoomTo(triangle);
      triangle.show = false;

      let text = this.$viewer.entities.add({
        name: "46",
        position: Cesium.Cartesian3.fromDegrees(138.6, 36),
        label: {
          text: "46",
          font: "20px Consolas",
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
        },
      });

      text.show = false;

      let nogizaka = this.$viewer.entities.add({
        name: "nogizaka",
        position: Cesium.Cartesian3.fromDegrees(136, 34),
        label: {
          text: "乃木坂",
          font: "14px Consolas",
          fillColor: Cesium.Color.PURPLE.withAlpha(0.7),
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
          eyeOffset: Cesium.Cartesian3(21.0, 0.0, 0.0),
        },
      });

      nogizaka.show = false;

      // 椭圆
      let ellipse = this.$viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
        ellipse: {
          semiMinorAxis: 250000.0,
          semiMajorAxis: 400000.0,
          material: Cesium.Color.BLUE.withAlpha(0.5),
        },
      });
      // 棋盘材质
      // ellipse.ellipse.material = new Cesium.CheckerboardMaterialProperty({
      //   evenColor: Cesium.Color.WHITE,
      //   oddColor: Cesium.Color.BLACK,
      //   repeat: new Cesium.Cartesian2(4, 4),
      // });

      // 条纹材质
      // ellipse.ellipse.material = new Cesium.StripeMaterialProperty({
      //   evenColor: Cesium.Color.WHITE,
      //   oddColor: Cesium.Color.BLACK,
      //   repeat: 32,
      // });

      // 网格材质
      ellipse.ellipse.material = new Cesium.GridMaterialProperty({
        color: Cesium.Color.YELLOW,
        cellAlpha: 0.2,
        lineCount: new Cesium.Cartesian2(8, 8),
        lineThickness: new Cesium.Cartesian2(2.0, 2.0),
      });

      // this.$viewer.zoomTo(ellipse);
      ellipse.show = false;
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

    useGeometry() {},

    usePrimitive() {},

    adjustPosition() {
      let box = this.$viewer.entities.getById("box");
      let surface = Cesium.Cartesian3.fromRadians(-90.0, 40.0, 300000.0);
      let offset = Cesium.Cartesian3.fromRadians(-90.0, 40.0, 0.0);
      let translation = Cesium.Cartesian3.subtract(
        offset,
        surface,
        new Cesium.Cartesian3()
      );
      let modelMatrix = Cesium.Matrix4.fromTranslation(translation);
      box.computeModelMatrix(Cesium.JulianDate.now(), modelMatrix);
    },
    // 创建实体
    createEntity(entity) {
      // return new Promise(() => {
      //   this.$viewer.entities.add({
      //     name: entity.name,
      //     id: entity.id,
      //     show: true,
      //     position: entity.position,
      //     orientation: entity.orientation,
      //     model: entity.model,
      //     path: entity.path,
      //   });
      // })
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
    // 更新实体控制
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
    // 更新粒子控制
    controlParticle() {},
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
            _this.$viewer.zoomTo(fighter, new Cesium.HeadingPitchRange(-1, -0.3, 150));
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

      // promise2.then(() => {
      //   let start = {
      //     longitude: -75.59777,
      //     latitude: 40.03883,
      //     height: 8000,
      //   };
      //   let stop = {
      //     longitude: -75.59777,
      //     latitude: 40.041,
      //     height: 8000,
      //   };

      //   _this.controlEntity(start, stop, 2);
      // });
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
