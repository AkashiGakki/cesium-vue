import VueRouter from 'vue-router';
import App from './App.vue'
import CesiumSail from './components/CesiumSail'
import CircleScan from './effect/CircleScan'
import RadarScan from './effect/RadarScan'
import CircleRipple from './effect/CircleRipple'
import FlashCircle from './effect/FlashCircle'
import FlashPoint from './effect/FlashPoint'
import DynamicLine from './effect/DynamicLine'
import DynamicLine2 from './effect/DynamicLine2'
import LightScan from './effect/LightScan'
import Draw from './effect/Draw'
import CalcDraw from './effect/CalcDraw'
import Water from './effect/Water'
import Rain from './effect/Rain'
import Snow from './effect/Snow'


const push_ = VueRouter.prototype.push;

VueRouter.prototype.push = function (location) {
  return push_.call(this, location).catch(err => err);
}

export default new VueRouter({
  // mode: "history",
  routes: [{
    path: "/",
    name: "app",
    redirect: "/main"
  }, {
    path: "/main",
    name: "main",
    component: CesiumSail,
  }, {
    path: "/scan",
    name: "scan",
    component: CircleScan,
  }, {
    path: "/radar",
    name: "radar",
    component: RadarScan,
  }, {
    path: "/ripple",
    name: "ripple",
    component: CircleRipple,
  }, {
    path: "/flash-circle",
    name: "flash-circle",
    component: FlashCircle,
  }, {
    path: "/flash-point",
    name: "flash-point",
    component: FlashPoint,
  }, {
    path: "/dynamic-line",
    name: "dynamic-line",
    component: DynamicLine,
  }, {
    path: "/dynamic-line2",
    name: "dynamic-line2",
    component: DynamicLine2,
  }, {
    path: "/light-scan",
    name: "light-scan",
    component: LightScan,
  }, {
    path: "/draw",
    name: "draw",
    component: Draw,
  }, {
    path: "/calc-draw",
    name: "calc-draw",
    component: CalcDraw,
  }, {
    path: "/water",
    name: "water",
    component: Water,
  }, {
    path: "/rain",
    name: "rain",
    component: Rain,
  }, {
    path: "/snow",
    name: "snow",
    component: Snow,
  }]
})