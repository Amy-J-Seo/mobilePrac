<template>
  <div class="searchbar">
    <el-button type="primary" @click="dialogVisible = true">
      <i></i>Search!
    </el-button>
    <el-dialog title="Search" :visible.sync="dialogVisible" width="70%">
      <form>
        <div class="form-control">
          <label for="ip">Ip</label>
          <input type="text" name="ip" />
        </div>
        <div class="form-control">
          <label for="port">Port</label>
          <input type="text" name="port" />
        </div>
        <div class="form-control">
          <label for="url">URL</label>
          <input type="text" name="url" />
        </div>
        <div class="form-control">
          <label for="date">Date</label>
          <input type="date" name="date" />
        </div>
        <span slot="footer" class="dialog-footer">
          <button type="sumbit">Search</button>
          <el-button @click="dialogVisible = false">Cancel</el-button>
        </span>
      </form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "IpSearchBar",
  data() {
    return {
      dialogVisible: false,
      ip: "",
      port: "",
      url: "",
      date: "",
    };
  },
};
</script>

<style scoped>
.searchBar {
  display: flex;
}
</style>
