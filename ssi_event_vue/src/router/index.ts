import Vue from "vue";
import VueRouter, { RouterMode } from "vue-router";

import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE as RouterMode,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }) as any, // making TS compiler happy
  routes
});

export default router;
