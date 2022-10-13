import Vue from "vue";
import Vuex from "vuex";

import wallet from "./modules/wallet.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    wallet,
  },
});
