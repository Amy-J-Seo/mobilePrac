import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import loginStore from "./modules/loginStore";
import ipStore from "./modules/ipStore";

export default new Vuex.Store({
  modules: {
    loginStore: loginStore,
    ipStore: ipStore,
  },
});
