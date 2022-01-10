import Vue from "vue";
import VueRouter from "vue-router";
import About from "./components/About.vue";
import Login from "./components/Login.vue";
import ContactUs from "./components/ContactUs.vue";
import PasswordChange from "./components/PasswordChange.vue";
import Setting from "./components/Setting.vue";
import Register from "./components/Register.vue";
import IpControl from "./components/IpControl.vue";
import NestedComponent from "./views/NestedComponent.vue";

Vue.use(VueRouter);

const route = [
  { path: "/about", component: About },
  { path: "/login", component: Login },
  { path: "/contactus", component: ContactUs },
  { path: "/changepassword", component: PasswordChange },
  { path: "/setting", component: Setting },
  { path: "/register", component: Register },
  { path: "/ipcontrol", component: IpControl },
  { path: "/component", component: NestedComponent },
];

const router = new VueRouter({
  mode: "history",
  routes: route,
});

export default router;
