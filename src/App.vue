<template>
  <div id="app">
    <CesiumViewer></CesiumViewer>
  </div>
</template>

<script>
import CesiumViewer from './components/CesiumViewer'

export default {
  name: 'App',
  components: {
    CesiumViewer
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
