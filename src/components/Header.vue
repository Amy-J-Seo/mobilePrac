<template>
  <div class="topnav">
    <router-link to="/about" id="logo"> 제품로고 </router-link>
    <div :class="[linkVisible ? 'active' : 'notactive']" id="myLinks">
      <router-link to="/about" class="navlink">Main</router-link>
      <router-link to="/login" class="navlink">Login</router-link>
      <router-link to="/contactus" class="navlink"> Table page </router-link>
      <router-link to="/changepassword" class="navlink">
        비밀번호바꾸기
      </router-link>
      <router-link to="/setting" class="navlink"> setting </router-link>
    </div>

    <button v-if="userId != ''" @click="logoutHandler">log out</button>
    <button v-else @click="loginHandler">
      <router-link to="/login">To login page</router-link>
    </button>

    <div id="userInfo">
      <p>{{ userId }}</p>
    </div>

    <font-awesome-icon icon="hamburger" @click="toggleLink" id="toggleBtn" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      isLoggedIn: false,
      linkVisible: false,
      msg: "",
    };
  },
  computed: {
    ...mapGetters({
      userId: (state) => state.userId,
    }),
    ...mapState({
      userId: (state) => state.userId,
    }),
  },
  methods: {
    toggleLink() {
      this.linkVisible = !this.linkVisible;
    },
    logoutHandler() {
      this.$store.commit("userLogOut");
    },
    loginHandler() {},
  },
};
</script>

<style scoped>
.topnav {
  overflow: hidden;
  background-color: rgb(197, 197, 197);
  position: relative;
  margin-bottom: 10px;
}
#logo {
  color: black;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: flex;
}
.navlink {
  color: white;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: block;
  background-color: lightblue;
}
.active {
  display: block;
  height: 250px;
}
.notactive {
  display: none;
  height: 50px;
}
#toggleBtn {
  display: block;
  position: absolute;
  right: 15px;
  top: 15px;
}
#userInfo {
  display: block;
  position: absolute;
  right: 70px;
  top: 0px;
}
#toggleBtn:hover {
  background-color: lightblue;
}
</style>
