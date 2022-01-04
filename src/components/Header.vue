<template>
  <div>
    <h1>This is header</h1>
    <ul class="navs">
      <router-link to="/about"><li>About</li></router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/contactus"><li>Contact us</li></router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "header",
  data() {
    return {};
  },
};


</script>

<style scoped>
.navs li {
  display: inline;
  padding: 14px 16px;
}
</style>
