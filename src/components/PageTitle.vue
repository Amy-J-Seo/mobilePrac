<template>
  <div>
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  name: "PageTitleChild",
  props: {
    title: {
      type: String,
      default: "This is page title",
    },
  },
};
</script>

<style scoped></style>
