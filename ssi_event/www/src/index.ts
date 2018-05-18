import Vue from "vue";
import VueRouter from 'vue-router'
import { Route } from 'vue-router';

import HelloComponent from './components/Hello'
import HomeComponent from './components/Home.vue'

//import Vuetify from 'vuetify'
//import 'babel-polyfill'

Vue.use(VueRouter)
Vue.config.productionTip = false

//Vue.use(Vuetify)

const router = new VueRouter({
  //  mode: "abstract",
  //  base: 'development' === 'development' ? '/ssi_event/www' : '/ssi_event/www',
  routes: [
    {
      name: 'home',
      path: '/home',
      component: HomeComponent
    },
    {
      name: 'hello',
      path: '/hello/:name/:initialEnthusiasm',
      component: HelloComponent,
      props: function (route: Route) {
        return {
          name: route.params.name,
          initialEnthusiasm: parseInt(route.params.initialEnthusiasm)
        }
      }
    }
  ]
})

new Vue({
  el: "#app",
  router,
  data: { name: "World" },
  components: { HomeComponent, HelloComponent }
});