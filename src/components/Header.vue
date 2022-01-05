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
    </div>
    <font-awesome-icon icon="hamburger" @click="toggleLink" id="toggleBtn" />
  </div>
</template>

<script>
export default {
  name: "header",
  data() {
    return {
      linkVisible: false,
    };
  },
  methods: {
    toggleLink() {
      console.log(this.linkVisible);
      this.linkVisible = !this.linkVisible;
    },
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
  height: 200px;
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
#toggleBtn:hover {
  background-color: lightblue;
}
</style>
