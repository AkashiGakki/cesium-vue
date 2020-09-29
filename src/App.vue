<template>
  <div id="app">
    <div class="route-links">
      <router-link to="/main" style="margin:5px">飞机效果</router-link>
      <router-link to="/scan" style="margin:5px">圆形扫描</router-link>
      <router-link to="/radar" style="margin:5px">雷达扫描</router-link>
      <!-- <router-link to="/ripple" style="margin:5px">双圆涟漪</router-link> -->
      <router-link to="/flash-circle" style="margin:5px">闪圆</router-link>
      <router-link to="/flash-point" style="margin:5px">闪点</router-link>
      <router-link to="/dynamic-line" style="margin:5px">动态线</router-link>
      <router-link to="/dynamic-line2" style="margin:5px">动态线2</router-link>
      <router-link to="/light-scan" style="margin:5px">灯光扫描</router-link>
      <router-link to="/draw" style="margin:5px">绘制</router-link>
      <router-link to="/calc-draw" style="margin:5px">绘制计算</router-link>
      <router-link to="/water" style="margin:5px">水流</router-link>
      <router-link to="/rain" style="margin:5px">雨景</router-link>
      <router-link to="/snow" style="margin:5px">雪景</router-link>
      <router-link to="/thunder" style="margin:5px">雷电</router-link>
    </div>

    <router-view></router-view>

    <!-- 初始化效果 -->
    <!-- <CesiumViewer></CesiumViewer> -->

    <!-- 添加图层 -->
    <!-- <AddLayer /> -->

    <!-- 添加地形 -->
    <!-- <AddTerrain /> -->

    <!-- 配置视窗 -->
    <!-- <ConfigScene /> -->

    <!-- 加载实体 -->
    <!-- <LoadEntity /> -->

    <!-- 绘制实体 -->
    <!-- <UseEntity /> -->

    <!-- 绘制立体图 -->
    <!-- <UsePrimitive /> -->

    <!-- 3dModel -->
    <!-- <Use3DModel /> -->

    <!-- 设置飞行场景 -->
    <!-- <SetScene /> -->

    <!-- 天气粒子效果 -->
    <!-- <Weather /> -->

    <!-- 加载 primitive model -->
    <!-- <LoadModel /> -->

    <!-- 控制模型飞行 -->
    <!-- <ControlModel /> -->

    <!-- 相机漫游 -->
    <!-- <CameraTutorial /> -->

    <!-- <CesiumSail /> -->
  </div>
</template>

<script>
import CesiumViewer from "./components/CesiumViewer";
import AddLayer from "./components/AddLayer";
import AddTerrain from "./components/AddTerrain";
import ConfigScene from "./components/ConfigScene";
import LoadEntity from "./components/LoadEntity";
import UseEntity from "./components/UseEntity";
import UsePrimitive from "./components/UsePrimitive";
import Use3DModel from "./components/Use3DModel";
import SetScene from "./components/SetScene";
import Weather from "./components/WeatherParticleSystem";
import LoadModel from "./components/LoadModel";
import ControlModel from "./components/ControlModel";
import CameraTutorial from "./components/CameraTutorial";
import CesiumSail from "./components/CesiumSail";

export default {
  name: "App",
  components: {
    CesiumViewer,
    AddLayer,
    AddTerrain,
    ConfigScene,
    LoadEntity,
    UseEntity,
    UsePrimitive,
    Use3DModel,
    SetScene,
    Weather,
    LoadModel,
    ControlModel,
    CameraTutorial,
    CesiumSail,
  },
};
</script>

<style>
*,
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}

.route-links {
  height: 20px;
  line-height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#container {
  display: block;
  border: none;
  width: 100vw;
  height: calc(100vh - 20px);
}
</style>
