import Vue from "vue";
import App from "./App.vue";

import "vue-easytable/libs/theme-default/index.css"; // import style
import VueEasytable from "vue-easytable"; // import library
import router from "./router";

Vue.config.productionTip = false;

Vue.use(VueEasytable);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
