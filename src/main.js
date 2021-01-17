import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import moment from "moment";

import Chartkick from "vue-chartkick";
import Chart from "highcharts";
Vue.use(Chartkick.use(Chart));

Vue.config.productionTip = false;
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("YYYY-MM-DD");
  }
});

new Vue({
  el: "#app",
  router,
  template: "<App/>",
  vuetify,
  moment,
  components: { App },
});
