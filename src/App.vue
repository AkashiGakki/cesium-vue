<template>
  <div id="app">
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

    <CesiumSail />
  </div>
</template>

<script>
import CesiumViewer from './components/CesiumViewer'
import AddLayer from './components/AddLayer'
import AddTerrain from './components/AddTerrain'
import ConfigScene from './components/ConfigScene'
import LoadEntity from './components/LoadEntity'
import UseEntity from './components/UseEntity'
import UsePrimitive from './components/UsePrimitive'
import Use3DModel from './components/Use3DModel'
import SetScene from './components/SetScene'
import Weather from './components/WeatherParticleSystem'
import LoadModel from './components/LoadModel'
import ControlModel from './components/ControlModel'
import CameraTutorial from './components/CameraTutorial'
import CesiumSail from './components/CesiumSail'

export default {
  name: 'App',
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
    CesiumSail
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
