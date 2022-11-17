import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "../views/MainPage.vue";
import GoverancePage from "../views/GovernancePage.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/main",
    },
    {
      path: "/main",
      component: MainPage,
    },
    {
      path: "/gov/:id",
      component: GoverancePage,
    },
  ],
});

export default router;
