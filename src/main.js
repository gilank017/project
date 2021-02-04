import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

import chartkick from "vue-chartkick";
import Chart from "highcharts";
Vue.use(chartkick.use(Chart));

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  template: "<App/>",
  vuetify,
  components: { App },
});
