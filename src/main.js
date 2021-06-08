import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./quasar";

import { Quasar, Notify } from "quasar";

import http from "./http";
Vue.prototype.$axios = http;

Vue.config.productionTip = false;

Vue.use(Quasar, {
  plugins: {
    Notify,
  },
  config: {
    notify: {
      /* look at QUASARCONFOPTIONS from the API card (bottom of page) */
    },
  },
});

new Vue({
  router,
  store,
  Notify,
  render: (h) => h(App),
}).$mount("#app");
