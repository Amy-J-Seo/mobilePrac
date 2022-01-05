import Vue from "vue";
import App from "./App.vue";

import "vue-easytable/libs/theme-default/index.css"; // import style
import VueEasytable from "vue-easytable"; // import library
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { store } from "./store/store";

Vue.config.productionTip = false;

library.add(faUserSecret);
library.add(faHamburger);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueEasytable);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
