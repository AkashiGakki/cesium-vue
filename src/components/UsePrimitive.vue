<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

export default {
  name: "AddLayer",
  mounted() {
    this.init();
    this.usePrimitiveAPI();
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
    // 绘制立体图形
    usePrimitiveAPI() {
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
  },
};
</script>

<style scoped>
</style>