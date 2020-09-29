<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

import YsCesium from "../source/YsCesium";

export default {
  name: "LightScan",
  mounted() {
    this.scan();
  },
  methods: {
    scan() {
      const options = {
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
      const app = new YsCesium("container", options);
      const viewer = app.viewer;

      viewer.cesiumWidget.creditContainer.style.display = "none";

      let scene = viewer.scene;
      let canvas = viewer.canvas;
      let camera = viewer.camera;
      // scene.screenSpaceCameraController.minimumZoomDistance = 100;
      // viewer.clock.onTick.addEventListener(function () {
      //   setMinCamera();
      // });
      // let setMinCamera = function () {
      //   if (camera.pitch > 0) {
      //     scene.screenSpaceCameraController.enableTilt = false;
      //   }
      // };

      let startMousePosition;
      let mousePosition;
      let handler = new Cesium.ScreenSpaceEventHandler(canvas);
      handler.setInputAction(function (movement) {
        mousePosition = startMousePosition = Cesium.Cartesian3.clone(
          movement.position
        );
        handler.setInputAction(function (movement) {
          mousePosition = movement.endPosition;
          let y = mousePosition.y - startMousePosition.y;
          if (y > 0) {
            scene.screenSpaceCameraController.enableTilt = true;
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);

      const data = {
        circle: [0.003, 117, 35, 30], // 第一个参数 0.003表示半径，第二个第三个分别表示底座圆心的坐标,第四个表示切割成多少个点。组成多少个面。越多会越卡 尽量实际项目不影响效果，越少越好。
        observer: [117.01, 35.01, 500], //观察点，也就是光源点
        positionList: [
          //我们这里就不加高度了。不然太麻烦了 //以圆心为参考做偏移值获取，圆心坐标 [117,35]，简单点画个正方形吧 如果画圆的画，也可以多取点
          [117, 35], //初始位置 (圆心坐标 [117,35]要和这个初始位置统一，不然会偏移出去)
          [117.01, 35], //下一个点
          [117.01, 35.01],
          [117, 35.01],
          [117, 35], //回来
        ],
        material: Cesium.Color.RED.withAlpha(0.5), //光的材质
        number: 100, //数字越小速度越快
      };
      const entityCList = app.addLightScan(data); //返回的是所有面的数组 如果需要清除的画，就通过此清除

      //清除
      // for(var i=0;i< entityCList.length;i++){
      //     viewer.entities.remove(entityCList[i]);
      // }

      //**** 下面是额外的 可加可不加***//
      //立方体柱子 表示站台
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
          data.observer[0],
          data.observer[1],
          data.observer[2] / 2
        ),
        name: "",
        box: {
          dimensions: new Cesium.Cartesian3(100.0, 100.0, data.observer[2]),
          outline: true,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
          material: Cesium.Color.fromRandom({ alpha: 0.5 }),
        },
      });
      //发蓝光的线
      const glowingLine = viewer.entities.add({
        name: "Glowing blue line on the surface",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            data.positionList[0][0],
            data.positionList[0][1],
            data.positionList[1][0],
            data.positionList[1][1],
            data.positionList[2][0],
            data.positionList[2][1],
            data.positionList[3][0],
            data.positionList[3][1],
            data.positionList[4][0],
            data.positionList[4][1],
          ]),
          width: 10,
          material: new Cesium.PolylineGlowMaterialProperty({
            //发光线
            glowPower: 0.2,
            color: Cesium.Color.BLUE,
          }),
        },
      });
      viewer.zoomTo(viewer.entities);
    },
  },
};
</script>

<style scoped>
</style>