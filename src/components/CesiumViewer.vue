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

    // 设置场景
    // this.setScene();

    // 绘制实体
    // this.useEntity();
    // this.usePrimitive();

    // 雪景
    // this.snow();

    // 雨景
    // this.rain();

    // this.sonwRef();
    // this.rainRef();
    // this.thunderRef();

    this.addModel();
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
          material: Cesium.Color.RED.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.BLACK,
          height: 200000,
          extrudedHeight: 250000,
        },
      });

      // polygon.polygon.height = 200000;
      // polygon.polygon.extrudedHeight = 250000;

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

      let point = this.$viewer.entities.add({
        name: "point",
        position: Cesium.Cartesian3.fromDegrees(121.506377, 31.245105),
        point: {
          pixelSize: 5,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
        },
        label: {
          text: "Shanghai",
          font: "14pt monospace",
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -9),
        },
      });

      // this.$viewer.zoomTo(point);
      // this.$viewer.trackedEntity = point;
      point.show = false;
      // let camera = new Cesium.Camera(this.$viewer.scene);
      // camera.flyTo({
      //   destination: Cesium.Cartesian3.fromDegrees(
      //     121.506377,
      //     31.245105,
      //     1000000.0
      //   ),
      // });

      let logo = this.$viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(139.46, 35.42),
        billboard: {
          image: "images/Nogizaka46_Logo.png",
          width: 128,
          height: 128,
        },
      });
      // this.$viewer.trackedEntity = logo;
      logo.show = false;
      // let camera = new Cesium.Camera(this.$viewer.scene);
      // camera.flyTo({
      //   destination: Cesium.Cartesian3.fromDegrees(136, 36, 1000000),
      // });

      // 屏幕坐标
      // let handler = new Cesium.ScreenSpaceEventHandler(
      //   this.$viewer.scene.canvas
      // );
      // handler.setInputAction((movement) => {
      //   console.log(movement.position);
      // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // 世界坐标
      // let handler = new Cesium.ScreenSpaceEventHandler(this.$viewer.scene.canvas);
      // handler.setInputAction((movement) => {
      //   let position = this.$viewer.scene.camera.pickEllipsoid(
      //     movement.position,
      //     this.$viewer.scene.globe.ellipsoid
      //   );
      //   console.log(position);
      // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // 场景坐标
      // let handler = new Cesium.ScreenSpaceEventHandler(
      //   this.$viewer.scene.canvas
      // );
      // handler.setInputAction((movement) => {
      //   let position = this.$viewer.scene.pickPosition(movement.position);
      //   console.log(position);
      // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // 地标坐标
      // let handler = new Cesium.ScreenSpaceEventHandler(this.$viewer.scene.canvas);
      // handler.setInputAction((movement) => {
      //   let ray = this.$viewer.camera.getPickRay(movement.position);
      //   let position = this.$viewer.scene.globe.pick(ray, this.$viewer.scene);
      //   console.log(position);
      // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

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
      // ellipse.ellipse.material = new Cesium.GridMaterialProperty({
      //   color: Cesium.Color.YELLOW,
      //   cellAlpha: 0.2,
      //   lineCount: new Cesium.Cartesian2(8, 8),
      //   lineThickness: new Cesium.Cartesian2(2.0, 2.0),
      // });

      // ellipse.ellipse.fill = false;
      // ellipse.ellipse.outline = true;
      // ellipse.ellipse.outlineColor = Cesium.Color.YELLOW;
      // ellipse.ellipse.outlineWidth = 5.0;

      // this.$viewer.zoomTo(ellipse);
      ellipse.show = false;
    },
    // 绘制实体
    useEntity() {
      // Box
      let blueBox = this.$viewer.entities.add({
        name: "Blue box",
        //中心的位置
        position: Cesium.Cartesian3.fromDegrees(-114.0, 40.0, 300000.0),
        box: {
          //长宽高
          dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
          material: Cesium.Color.BLUE.withAlpha(0.5),
        },
      });
      blueBox.show = false;

      let redBox = this.$viewer.entities.add({
        name: "Red box with black outline",
        position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
        box: {
          dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
          material: Cesium.Color.RED,
          outline: true, //显示轮廓
          outlineColor: Cesium.Color.BLACK,
        },
      });
      redBox.show = false;

      let outlineOnly = this.$viewer.entities.add({
        name: "Yellow box outline",
        position: Cesium.Cartesian3.fromDegrees(-100.0, 40.0, 300000.0),
        box: {
          dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
          fill: false, //不显示填充
          outline: true,
          outlineColor: Cesium.Color.YELLOW,
        },
      });
      outlineOnly.show = false;

      //Circles Ellipses
      //浮空的绿色圆形
      let greenCircle = this.$viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-111.0, 40.0, 150000.0),
        name: "Green circle at height",
        ellipse: {
          semiMinorAxis: 300000.0,
          semiMajorAxis: 300000.0,
          height: 200000.0, //浮空
          material: Cesium.Color.GREEN,
        },
      });
      greenCircle.show = false;

      //红色椭圆形，位于地表，带轮廓
      let redEllipse = this.$viewer.entities.add({
        //不带高度
        position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
        name: "Red ellipse on surface with outline",
        ellipse: {
          semiMinorAxis: 250000.0,
          semiMajorAxis: 400000.0,
          material: Cesium.Color.RED.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.RED,
        },
      });
      redEllipse.show = false;

      //蓝色椭圆柱，旋转了角度
      let blueEllipse = this.$viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-95.0, 40.0, 100000.0),
        name: "Blue translucent, rotated, and extruded ellipse",
        ellipse: {
          semiMinorAxis: 150000.0,
          semiMajorAxis: 300000.0,
          extrudedHeight: 200000.0, //拉伸
          rotation: Cesium.Math.toRadians(45), //旋转
          material: Cesium.Color.BLUE.withAlpha(0.7),
          outline: true,
        },
      });
      blueEllipse.show = false;
      // this.$viewer.zoomTo(this.$viewer.entities);

      // Corridor
      let redCorridor = this.$viewer.entities.add({
        name: "Red corridor on surface with rounded corners and outline",
        corridor: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            -100.0,
            40.0,
            -105.0,
            40.0,
            -105.0,
            35.0,
          ]),
          width: 200000.0,
          material: Cesium.Color.RED.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.RED,
        },
      });
      redCorridor.show = false;

      let greenCorridor = this.$viewer.entities.add({
        name: "Green corridor at height with mitered corners",
        corridor: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            -90.0,
            40.0,
            -95.0,
            40.0,
            -95.0,
            35.0,
          ]),
          height: 100000.0,
          width: 200000.0,
          cornerType: Cesium.CornerType.MITERED,
          material: Cesium.Color.GREEN,
        },
      });
      greenCorridor.show = false;

      let blueCorridor = this.$viewer.entities.add({
        name: "Blue extruded corridor with beveled corners and outline",
        corridor: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            -80.0,
            40.0,
            -85.0,
            40.0,
            -85.0,
            35.0,
          ]),
          height: 200000.0,
          extrudedHeight: 100000.0,
          width: 200000.0,
          cornerType: Cesium.CornerType.BEVELED,
          material: Cesium.Color.BLUE.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.BLUE,
        },
      });
      blueCorridor.show = false;
      // this.$viewer.zoomTo(this.$viewer.entities);

      //圆柱和圆锥 Cylinder Cones
      let greenCylinder = this.$viewer.entities.add({
        name: "Green cylinder with black outline",
        position: Cesium.Cartesian3.fromDegrees(-100.0, 40.0, 200000.0),
        cylinder: {
          //圆柱
          length: 400000.0,
          topRadius: 200000.0,
          bottomRadius: 200000.0,
          material: Cesium.Color.GREEN,
          outline: true,
          outlineColor: Cesium.Color.DARK_GREEN,
        },
      });
      greenCylinder.show = false;

      let redCone = this.$viewer.entities.add({
        name: "Red cone",
        position: Cesium.Cartesian3.fromDegrees(-105.0, 40.0, 200000.0),
        cylinder: {
          //圆锥
          length: 400000.0,
          topRadius: 0.0,
          bottomRadius: 200000.0,
          material: Cesium.Color.RED,
        },
      });
      redCone.show = false;
      // this.$viewer.zoomTo(this.$viewer.entities);

      // 多边形 Polygon
      let redPolygon = this.$viewer.entities.add({
        name: "贴着地表的多边形",
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray([
            -115.0,
            37.0,
            -115.0,
            32.0,
            -107.0,
            33.0,
            -102.0,
            31.0,
            -102.0,
            35.0,
          ]),
          material: Cesium.Color.RED,
        },
      });
      redPolygon.show = false;

      let greenPolygon = this.$viewer.entities.add({
        name: "绿色拉伸多边形",
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray([
            -108.0,
            42.0,
            -100.0,
            42.0,
            -104.0,
            40.0,
          ]),
          extrudedHeight: 500000.0,
          material: Cesium.Color.GREEN,
        },
      });
      greenPolygon.show = false;

      let orangePolygon = this.$viewer.entities.add({
        name: "每个顶点具有不同拉伸高度的橘色多边形",
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
            -108.0,
            25.0,
            100000,
            -100.0,
            25.0,
            100000,
            -100.0,
            30.0,
            100000,
            -108.0,
            30.0,
            300000,
          ]),
          extrudedHeight: 0,
          perPositionHeight: true,
          material: Cesium.Color.ORANGE,
          outline: true,
          outlineColor: Cesium.Color.BLACK,
        },
      });
      orangePolygon.show = false;

      let bluePolygon = this.$viewer.entities.add({
        name: "具有挖空效果的蓝色多边形",
        polygon: {
          hierarchy: {
            positions: Cesium.Cartesian3.fromDegreesArray([
              -99.0,
              30.0,
              -85.0,
              30.0,
              -85.0,
              40.0,
              -99.0,
              40.0,
            ]),
            holes: [
              {
                positions: Cesium.Cartesian3.fromDegreesArray([
                  -97.0,
                  31.0,
                  -97.0,
                  39.0,
                  -87.0,
                  39.0,
                  -87.0,
                  31.0,
                ]),
                holes: [
                  {
                    positions: Cesium.Cartesian3.fromDegreesArray([
                      -95.0,
                      33.0,
                      -89.0,
                      33.0,
                      -89.0,
                      37.0,
                      -95.0,
                      37.0,
                    ]),
                    holes: [
                      {
                        positions: Cesium.Cartesian3.fromDegreesArray([
                          -93.0,
                          34.0,
                          -91.0,
                          34.0,
                          -91.0,
                          36.0,
                          -93.0,
                          36.0,
                        ]),
                      },
                    ],
                  },
                ],
              },
            ],
          },
          material: Cesium.Color.BLUE,
          outline: true,
          outlineColor: Cesium.Color.BLACK,
        },
      });
      bluePolygon.show = false;
      // this.$viewer.zoomTo(this.$viewer.entities);

      // Polylines
      let redLine = this.$viewer.entities.add({
        name: "Red line on terrain",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
          width: 5,
          material: Cesium.Color.RED,
          clampToGround: true,
        },
      });
      redLine.show = false;

      let greenRhumbLine = this.$viewer.entities.add({
        name: "Green rhumb line",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
          width: 5,
          arcType: Cesium.ArcType.RHUMB,
          material: Cesium.Color.GREEN,
        },
      });
      greenRhumbLine.show = false;

      let glowingLine = this.$viewer.entities.add({
        name: "Glowing blue line on the surface",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([-75, 37, -125, 37]),
          width: 10,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.2,
            taperPower: 0.5,
            color: Cesium.Color.CORNFLOWERBLUE,
          }),
        },
      });
      glowingLine.show = false;

      let orangeOutlined = this.$viewer.entities.add({
        name:
          "Orange line with black outline at height and following the surface",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -75,
            39,
            250000,
            -125,
            39,
            250000,
          ]),
          width: 5,
          material: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.ORANGE,
            outlineWidth: 2,
            outlineColor: Cesium.Color.BLACK,
          }),
        },
      });
      orangeOutlined.show = false;

      let purpleArrow = this.$viewer.entities.add({
        name: "Purple straight arrow at height",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -75,
            43,
            500000,
            -125,
            43,
            500000,
          ]),
          width: 10,
          arcType: Cesium.ArcType.NONE,
          material: new Cesium.PolylineArrowMaterialProperty(
            Cesium.Color.PURPLE
          ),
        },
      });
      purpleArrow.show = false;

      let dashedLine = this.$viewer.entities.add({
        name: "Blue dashed line",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -75,
            45,
            500000,
            -125,
            45,
            500000,
          ]),
          width: 4,
          material: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.CYAN,
          }),
        },
      });
      dashedLine.show = false;

      // this.$viewer.zoomTo(this.$viewer.entities);

      // Polyline Volumes
      function computeCircle(radius) {
        var positions = [];
        for (var i = 0; i < 360; i++) {
          var radians = Cesium.Math.toRadians(i);
          positions.push(
            new Cesium.Cartesian2(
              radius * Math.cos(radians),
              radius * Math.sin(radians)
            )
          );
        }
        return positions;
      }

      function computeStar(arms, rOuter, rInner) {
        var angle = Math.PI / arms;
        var length = 2 * arms;
        var positions = new Array(length);
        for (var i = 0; i < length; i++) {
          var r = i % 2 === 0 ? rOuter : rInner;
          positions[i] = new Cesium.Cartesian2(
            Math.cos(i * angle) * r,
            Math.sin(i * angle) * r
          );
        }
        return positions;
      }

      let redTube = this.$viewer.entities.add({
        name: "Red tube with rounded corners",
        polylineVolume: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            -85.0,
            32.0,
            -85.0,
            36.0,
            -89.0,
            36.0,
          ]),
          shape: computeCircle(60000.0),
          material: Cesium.Color.RED,
        },
      });
      redTube.show = false;

      let greenBox = this.$viewer.entities.add({
        name: "Green box with beveled corners and outline",
        polylineVolume: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -90.0,
            32.0,
            0.0,
            -90.0,
            36.0,
            100000.0,
            -94.0,
            36.0,
            0.0,
          ]),
          shape: [
            new Cesium.Cartesian2(-50000, -50000),
            new Cesium.Cartesian2(50000, -50000),
            new Cesium.Cartesian2(50000, 50000),
            new Cesium.Cartesian2(-50000, 50000),
          ],
          cornerType: Cesium.CornerType.BEVELED,
          material: Cesium.Color.GREEN,
          outline: true,
          outlineColor: Cesium.Color.BLACK,
        },
      });
      greenBox.show = false;

      let blueStar = this.$viewer.entities.add({
        name: "Blue star with mitered corners and outline",
        polylineVolume: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -95.0,
            32.0,
            0.0,
            -95.0,
            36.0,
            100000.0,
            -99.0,
            36.0,
            200000.0,
          ]),
          shape: computeStar(7, 70000, 50000),
          cornerType: Cesium.CornerType.MITERED,
          material: Cesium.Color.BLUE,
          outline: true,
          outlineColor: Cesium.Color.BLACK,
        },
      });
      blueStar.show = false;

      // this.$viewer.zoomTo(this.$viewer.entities);

      // rectangle
      //红色矩形
      let redRectangle = this.$viewer.entities.add({
        name: "Red translucent rectangle with outline",
        rectangle: {
          coordinates: Cesium.Rectangle.fromDegrees(-110.0, 20.0, -80.0, 25.0),
          material: Cesium.Color.RED.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.RED,
        },
      });
      redRectangle.show = false;

      //绿色旋转、拉伸的矩形
      let greenRectangle = this.$viewer.entities.add({
        name: "Green translucent, rotated, and extruded rectangle",
        rectangle: {
          coordinates: Cesium.Rectangle.fromDegrees(-100.0, 30.0, -90.0, 40.0),
          material: Cesium.Color.GREEN.withAlpha(0.5),
          rotation: Cesium.Math.toRadians(45),
          extrudedHeight: 300000.0,
          height: 100000.0,
          outline: true,
          outlineColor: Cesium.Color.GREEN,
        },
      });
      greenRectangle.show = false;
      // this.$viewer.zoomTo(this.$viewer.entities);

      // Sphere Ellipsoid
      let blueEllipsoid = this.$viewer.entities.add({
        name: "Blue ellipsoid",
        position: Cesium.Cartesian3.fromDegrees(-114.0, 40.0, 300000.0),
        ellipsoid: {
          //可以指定三个轴的半径
          radii: new Cesium.Cartesian3(200000.0, 200000.0, 300000.0),
          material: Cesium.Color.BLUE,
        },
      });
      blueEllipsoid.show = false;

      let redSphere = this.$viewer.entities.add({
        name: "Red sphere with black outline",
        position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
        ellipsoid: {
          //正球体
          radii: new Cesium.Cartesian3(300000.0, 300000.0, 300000.0),
          material: Cesium.Color.RED,
          outline: true,
          outlineColor: Cesium.Color.BLACK,
        },
      });
      redSphere.show = false;

      let ellipsoidOutlineOnly = this.$viewer.entities.add({
        name: "Yellow ellipsoid outline",
        position: Cesium.Cartesian3.fromDegrees(-100.0, 40.0, 300000.0),
        ellipsoid: {
          radii: new Cesium.Cartesian3(200000.0, 200000.0, 300000.0),
          fill: false,
          outline: true,
          outlineColor: Cesium.Color.YELLOW,
          slicePartitions: 24, //横向切割线
          stackPartitions: 36, //纵向切割线
        },
      });
      ellipsoidOutlineOnly.show = false;
      // this.$viewer.zoomTo(this.$viewer.entities);

      // wall
      //东西方向的横墙
      let redWall = this.$viewer.entities.add({
        name: "Red wall at height",
        wall: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -115.0,
            44.0,
            200000.0, //坐标点
            -90.0,
            44.0,
            200000.0,
          ]),
          minimumHeights: [100000.0, 100000.0], //按坐标点的最小高度数组
          material: Cesium.Color.RED,
        },
      });
      redWall.show = false;

      //四边围墙
      let greenWall = this.$viewer.entities.add({
        name: "Green wall from surface with outline",
        wall: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -107.0,
            43.0,
            100000.0,
            -97.0,
            43.0,
            100000.0,
            -97.0,
            40.0,
            100000.0,
            -107.0,
            40.0,
            100000.0,
            -107.0,
            43.0,
            100000.0,
          ]),
          material: Cesium.Color.GREEN,
          outline: true,
          outlineColor: Cesium.Color.BLACK,
        },
      });
      greenWall.show = false;

      //曲折的墙
      let blueWall = this.$viewer.entities.add({
        name: "Blue wall with sawtooth heights and outline",
        wall: {
          //坐标点，不指定高度
          positions: Cesium.Cartesian3.fromDegreesArray([
            -115.0,
            50.0,
            -112.5,
            50.0,
            -110.0,
            50.0,
            -107.5,
            50.0,
            -105.0,
            50.0,
            -102.5,
            50.0,
            -100.0,
            50.0,
            -97.5,
            50.0,
            -95.0,
            50.0,
            -92.5,
            50.0,
            -90.0,
            50.0,
          ]),
          maximumHeights: [
            //上高
            100000,
            200000,
            100000,
            200000,
            100000,
            200000,
            100000,
            200000,
            100000,
            200000,
            100000,
          ],
          minimumHeights: [
            //下高
            0,
            100000,
            0,
            100000,
            0,
            100000,
            0,
            100000,
            0,
            100000,
            0,
          ],
          material: Cesium.Color.BLUE,
          outline: true,
          outlineColor: Cesium.Color.BLACK,
        },
      });
      blueWall.show = false;
      this.$viewer.zoomTo(this.$viewer.entities);
    },
    // 绘制立体图形
    usePrimitive() {
      // 盒子 box
      this.$viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: Cesium.BoxGeometry.fromDimensions({
              vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
              dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
            }),
            modelMatrix: Cesium.Matrix4.multiplyByTranslation(
              Cesium.Transforms.eastNorthUpToFixedFrame(
                Cesium.Cartesian3.fromDegrees(-105.0, 45.0)
              ),
              new Cesium.Cartesian3(0.0, 0.0, 250000),
              new Cesium.Matrix4()
            ),
            id: "boxid",
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.RED.withAlpha(0.5)
              ),
            },
          }),
          appearance: new Cesium.PerInstanceColorAppearance({
            closed: true,
          }),
        })
      );

      // 圆 circle
      this.$viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.CircleGeometry({
              center: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
              radius: 200000.0,
              // height: 300000,
              // extrudedHeight: 0
            }),
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.PINK
              ),
            },
          }),
          appearance: new Cesium.PerInstanceColorAppearance(),
        })
      );

      // 走廊 corridor
      this.$viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.CorridorGeometry({
              positions: Cesium.Cartesian3.fromDegreesArray([
                -90.0,
                40.0,
                -70.0,
                35.0,
                -70.0,
                30.0,
              ]),
              width: 60000,
            }),
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.RED.withAlpha(0.5)
              ),
            },
          }),
          appearance: new Cesium.PerInstanceColorAppearance(),
        })
      );

      // 共面多边几何 Coplanar
      this.$viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.CoplanarPolygonGeometry({
              polygonHierarchy: new Cesium.PolygonHierarchy(
                Cesium.Cartesian3.fromDegreesArrayHeights([
                  // -90.0,
                  // 30.0,
                  // 0.0,
                  // -90.0,
                  // 30.0,
                  // 10000.0,
                  // -80.0,
                  // 30.0,
                  // 10000.0,
                  // -80.0,
                  // 30.0,
                  // 0.0,

                  -110.0,
                  65.0,
                  100000,
                  -100.0,
                  65.0,
                  100000,
                  -100.0,
                  70.0,
                  100000,
                  -110.0,
                  70.0,
                  300000,
                ])
              ),
            }),
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.GREEN
              ),
            },
          }),
          appearance: new Cesium.PerInstanceColorAppearance(),
        })
      );

      // 圆柱 Cylinder
      this.$viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.CylinderGeometry({
              length: 400000,
              topRadius: 200000,
              bottomRadius: 200000,
            }),
            modelMatrix: Cesium.Matrix4.multiplyByTranslation(
              Cesium.Transforms.eastNorthUpToFixedFrame(
                Cesium.Cartesian3.fromDegrees(-100, 60)
              ),
              new Cesium.Cartesian3(0.0, 0.0, 100000.0),
              new Cesium.Matrix4()
            ),
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.GREEN
              ),
            },
          }),
          appearance: new Cesium.PerInstanceColorAppearance(),
        })
      );

      // 椭圆 ellipse
      this.$viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.EllipseGeometry({
              center: Cesium.Cartesian3.fromDegrees(-100.0, 20.0),
              semiMinorAxis: 200000.0,
              semiMajorAxis: 300000.0,
              // 回转
              rotation: Cesium.Math.PI_OVER_FOUR,
              vertexFormat: Cesium.VertexFormat.POSITION_AND_ST,
              height: 300000,
              extrudedHeight: 0,
            }),
            // attributes: {
            //   color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            //     Cesium.Color.PINK
            //   )
            // }
          }),
          appearance: new Cesium.EllipsoidSurfaceAppearance({
            material: Cesium.Material.fromType("Checkerboard"),
          }),
        })
      );

      // 椭球 ellipsoid
      this.$viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.EllipsoidGeometry({
              radii: new Cesium.Cartesian3(500000.0, 500000.0, 1000000.0),
              vertexFormat: Cesium.VertexFormat.POSITION_AND_NORMAL,
            }),
            modelMatrix: Cesium.Matrix4.multiplyByTranslation(
              Cesium.Transforms.eastNorthUpToFixedFrame(
                Cesium.Cartesian3.fromDegrees(-95, 35)
              ),
              new Cesium.Cartesian3(0.0, 0.0, 500000.0),
              new Cesium.Matrix4()
            ),
            id: "ellipsoid",
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.AQUA
              ),
            },
          }),
          appearance: new Cesium.PerInstanceColorAppearance(),
        })
      );

      // 多边形 polygon 三角形
      this.$viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.PolygonGeometry({
              polygonHierarchy: {
                positions: Cesium.Cartesian3.fromDegreesArray([
                  -80.0,
                  45.0,
                  -80.0,
                  40.0,
                  -85.0,
                  40.0,
                ]),
              },
              height: 300000,
              vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
            }),
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.PURPLE.withAlpha(0.5)
              ),
            },
          }),
          appearance: new Cesium.PerInstanceColorAppearance(),
        })
      );

      // 矩形 rectangle
      this.$viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.RectangleGeometry({
              rectangle: Cesium.Rectangle.fromDegrees(
                -140.0,
                30.0,
                -110.0,
                40.0
              ),
              vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
            }),
            id: "rectangle",
            attributes: {
              color: new Cesium.ColorGeometryInstanceAttribute(
                0.0,
                1.0,
                1.0,
                0.5
              ),
            },
          }),
          appearance: new Cesium.PerInstanceColorAppearance(),
        })
      );

      // 球体 Sphere(can't shown)
      this.$viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.SphereGeometry({
              radius: 10000.0,
              // vertexFormat : Cesium.VertexFormat.POSITION_ONLY
            }),
            modelMatrix: Cesium.Matrix4.multiplyByTranslation(
              Cesium.Transforms.eastNorthUpToFixedFrame(
                Cesium.Cartesian3.fromDegrees(-140, 40)
              ),
              new Cesium.Cartesian3(0.0, 0.0, 100000.0),
              new Cesium.Matrix4()
            ),
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.YELLOW.withAlpha(0.5)
              ),
            },
          }),
          appearance: new Cesium.PerInstanceColorAppearance(),
        })
      );

      // 墙体 Wall
      this.$viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.WallGeometry({
              positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                -115.0,
                45.0,
                300000.0,
                -115.0,
                50.0,
                300000.0,
                -120.0,
                50.0,
                300000.0,
                -120.0,
                45.0,
                300000.0,
                -115.0,
                45.0,
                300000.0,
              ]),
            }),
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.BLUE.withAlpha(0.5)
              ),
            },
          }),
          appearance: new Cesium.PerInstanceColorAppearance(),
        })
      );

      // 多边形实现箭头
      this.$viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.PolygonGeometry({
              polygonHierarchy: new Cesium.PolygonHierarchy(
                Cesium.Cartesian3.fromDegreesArray([
                  -105,
                  55,
                  -110,
                  60,
                  -115,
                  55,
                  -113,
                  55,
                  -113,
                  50,
                  -107,
                  50,
                  -107,
                  55,
                ])
              ),
              height: 300000.0,
              // perPositionHeight: true,
              extrudedHeight: 10,
            }),
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                Cesium.Color.RED.withAlpha(0.5)
              ),
            },
          }),
          appearance: new Cesium.PerInstanceColorAppearance(),
        })
      );

      // this.$viewer.scene.camera.setView({
      //   destination: new Cesium.Cartesian3.fromDegrees(-105, 40, 20000000),
      //   // orientation: new Cesium.HeadingPitchRoll(0, 0, 0),
      // });
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
        emissionRate: 700.0,
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
        startColor: new Cesium.Color(0.27, 0.5, 0.7, 0.0),
        endColor: new Cesium.Color(0.27, 0.5, 0.7, 0.98),
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

    addModel() {
      // let coord = Cesium.Cartesian3.fromDegrees(
      //   -75.62808254394531,
      //   40.02824946899414,
      //   0.0
      // );

      let position = Cesium.Cartesian3.fromDegrees(
        -75.62808254394531,
        40.02824946899414
      );
      // let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);

      let heading = Cesium.Math.toRadians(10.0);
      let pitch = Cesium.Math.toRadians(-10.0);
      let roll = Cesium.Math.toRadians(0.0);

      // let headingPitchRoll = new Cesium.HeadingPitchRoll(heading, pitch, roll);
      // let orientation = new Cesium.Transforms.headingPitchRollQuaternion(
      //   position,
      //   headingPitchRoll
      // );

      // let carModel = this.$viewer.scene.primitives.add(
      //   new Cesium.Model.fromGltf({
      //     //异步的加载模型
      //     url: "model3D/Truck.glb",
      //     scale: 3.0, //缩放
      //     position: position,
      //     modelMatrix: modelMatrix, //模型矩阵
      //   })
      // );
      // this.$viewer.trackedEntity = carModel;

      let fighter = this.$viewer.entities.add({
        name: "fighter",
        id: "J15",
        model: {
          uri: "model3D/J15.glb",
          minimumPixelSize: 100,
          maximumScale: 1000,
        },
        position: position,
      });

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

      let particleSystem = this.$viewer.scene.primitives.add(
        new Cesium.ParticleSystem({
          image: "images/rain-particle.png",
          imageSize: new Cesium.Cartesian2(20, 20),
          startScale: 1.0,
          endScale: 4.0,
          particleLife: 1.0,
          speed: 5.0,
          emitter: new Cesium.CircleEmitter(0.5),
          emissionRate: 5.0,
          modelMatrix: fighter.computeModelMatrix(
            Cesium.JulianDate.now(),
            new Cesium.Matrix4()
          ),
          lifetime: 16.0,
        })
      );
      particleSystem;
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
