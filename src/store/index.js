import Vue from "vue";
import Vuex from "vuex";

//modules
import session from "./session.module";
import chat from "./chat.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { session, chat }
});
