import Vue from "vue";
import VueRouter from "vue-router";
import About from "./components/About.vue";
import Login from "./components/Login.vue";
import ContactUs from "./components/ContactUs.vue";
import PasswordChange from "./components/PasswordChange.vue";

Vue.use(VueRouter);

const route = [
  { path: "/about", component: About },
  { path: "/login", component: Login },
  { path: "/contactus", component: ContactUs },
  { path: "/changepassword", component: PasswordChange },
];

const router = new VueRouter({
  mode: "history",
  routes: route,
});

export default router;
