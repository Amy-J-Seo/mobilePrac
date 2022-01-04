<template>
  <div>
    <h1>This is header</h1>
    <ul class="navs">
      <li>Main</li>
      <li>Tables</li>
      <li>Charts</li>
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
