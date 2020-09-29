<template>
  <div id="container" ref="viewer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

export default {
  name: "CameraTutorial",
  mounted() {
    this.init();
    this.cameraTurotial();
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
    cameraTurotial() {
      let scene = this.$viewer.scene;
      let canvas = this.$viewer.canvas;
      canvas.setAttribute("tabindex", "0"); // needed to put focus on the canvas
      canvas.onclick = function () {
        canvas.focus();
      };
      let ellipsoid = this.$viewer.scene.globe.ellipsoid;

      // disable the default event handlers
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

          // Coordinate (0.0, 0.0) will be where the mouse was clicked.
          let x = (mousePosition.x - startMousePosition.x) / width;
          let y = -(mousePosition.y - startMousePosition.y) / height;

          let lookFactor = 0.05;
          camera.lookRight(x * lookFactor);
          camera.lookUp(y * lookFactor);
        }

        // Change movement speed based on the distance of the camera to the surface of the ellipsoid.
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

      this.$viewer.scene.camera.setView({
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
    },
  },
};
</script>

<style scoped>
</style>