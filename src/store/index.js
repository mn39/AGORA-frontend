import Vue from "vue";
import Vuex from "vuex";

import wallet from "./modules/wallet.js";
import gov from "./modules/gov.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    wallet,
    gov,
  },
});
