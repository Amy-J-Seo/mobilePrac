<template>
  <div>
    <page-title title="passed prop title" />
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle.vue";
export default {
  components: { PageTitle },
  name: "NestedComponentParent",
};
</script>
