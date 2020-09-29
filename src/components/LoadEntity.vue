<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

export default {
  name: "LoadEntity",
  mounted() {
    this.init();
    this.LoadEntity();
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
    // 加载实体
    LoadEntity() {
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

      this.$viewer.trackedEntity = entity;
      // entity.show = false;

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
  },
};
</script>

<style scoped>
</style>