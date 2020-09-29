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
    this.useEntityAPI();
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
    // 绘制实体
    useEntityAPI() {
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
      // blueBox.show = false;

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
      // redBox.show = false;

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
      // outlineOnly.show = false;

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