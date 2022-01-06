<template>
  <div>
    <h1>This is Main page</h1>
    <el-button @click="$router.push('/ipcontrol')">Ip Control</el-button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  computed: {},
};
</script>
