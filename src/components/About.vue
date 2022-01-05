<template>
  <div>
    <h1>This is Main page</h1>
    <div v-for="todo in doneTodos" :key="todo.id">
      {{ todo.text }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AboutPage",
  computed: {
    ...mapGetters(["doneTodos"]),
  },
};
</script>
