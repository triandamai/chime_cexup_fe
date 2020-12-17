import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ApiService from "./services/api.service";
import { getMeeting } from "./services/jwt.service";
import firebase from "firebase";

import "./assets/tailwind.css";

import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);

Vue.config.productionTip = false;

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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const meeting = JSON.parse(getMeeting());
    if (meeting) {
      next();
    } else {
      next({
        redirect: "/login"
      });
    }
  } else {
    next();
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
