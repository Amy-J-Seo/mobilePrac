<template>
  <div>
    <div class="header">
      <h4>Ip management</h4>
    </div>
    <ip-search-bar />
    <br />
    <ip-control-table />
  </div>
</template>

<script>
import IpSearchBar from "./IpSearchBar.vue";
import IpControlTable from "./IpControlTable.vue";

export default {
  components: { IpSearchBar, IpControlTable },
  name: "IpControl",
};
</script>

<style scoped></style>
