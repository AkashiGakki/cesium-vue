<template>
  <div></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

export default {
  name: "AddLayer",
  mounted() {
    this.addLayers();
  },
  methods: {
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
  },
};
</script>

<style>
</style>