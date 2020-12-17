import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/join/:cexupcode",
    component: () => import("@/views/AutoJoin.vue")
  },
  {
    path: "/create/:cexupcode",
    component: () => import("@/views/AutoCreate.vue")
  },
  {
    path: "/home",
    component: () => import("@/views/Home.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        redirect: "main"
      },
      {
        path: "main",
        name: "Main",
        component: () => import("@/views/VideoMeeting.vue")
      },
      {
        path: "*",
        redirect: "404"
      },
      {
        path: "404",
        name: "404",
        component: () => import("@/views/NotFound.vue")
      }
    ]
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("@/components/ChatScreen.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue")
  },
  {
    path: "*",
    redirect: "/404"
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue")
  },
  {
    path: "/result",
    name: "ResultJoin",
    component: () => import("@/views/FailedJoin.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
