/**
 * Author : Trian Damaia
 * Date  28 December 2020
 * Time 13.50
 * Chime video conference
 * */

import Vue from "vue";
Vue.config.productionTip = false;
/**
 *
 * */

import App from "./App.vue";
/**
 * route for page
 * @param
 * @returns routes fro vue app
 *
 * */

import router from "./router";
/**
 * vuex store
 *
 * */

import store from "./store/index";
import ApiService from "./services/api.service";
import { getMeeting } from "./services/jwt.service";

import "./assets/tailwind.css";

/**
 * vue scrolling for chat screen
 * @param import vue chat scroll
 * @return scrolling to bottom on neew chat appear
 * s
 * */

import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);

import firebase from "firebase/app";
/**
 * firebase configuration for realtime database
 * @param config
 * @return firebase connsction configuration then initialize
 * */

var firebaseConfig = {
  apiKey: process.env.API_KEY ?? "AIzaSyC0uw-6rlymskqD-50qNlfngY-KzX36Vkw",
  authDomain: process.env.AUTH_DOMAIN ?? "react-91408.firebaseapp.com",
  databaseURL: process.env.DATABASE_URL ?? "ttps://react-91408.firebaseio.com",
  projectId: process.env.PROJECT_ID ?? "react-91408",
  storageBucket: process.env.STORAGE_BUCKET ?? "91405171265",
  messagingSenderId: process.env.MESSAGING_SENDER_ID ?? "91405171265",
  appId: process.env.APP_ID ?? "1:91405171265:web:dbc3217ed94c10f5a9e4c0s"
};
firebase.initializeApp(firebaseConfig);

//console.log(firebaseConfig);
ApiService.init();

/**
 * check if every route need auth
 * @param meta
 * @return redirect to result if there no meeting
 * */

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const meeting = JSON.parse(getMeeting());
    if (meeting) {
      next();
    } else {
      next({
        redirect: "/result"
      });
    }
  } else {
    next();
  }
});
/**
 * vue instance
 * */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
