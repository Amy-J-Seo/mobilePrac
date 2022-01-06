<template>
  <div>
    <div id="controlTable">
      <ve-table
        :columns="columns"
        :table-data="allIpList"
        row-key-field-name="rowKey"
        :checkbox-option="checkboxOption"
      ></ve-table>
    </div>
    <div class="btnContainer">
      <el-button type="primary" @click="dialogFormVisible = true"
        >Add</el-button
      >
      <button @click="dialogVisible = true">Add File</button>
      <button>Del</button>
    </div>

    <div class="addForm">
      <!-- file upload dialog  -->
      <el-dialog
        title="upload a file"
        :visible.sync="dialogVisible"
        width="70%"
      >
        <form>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </el-upload>
          <div class="form-control">
            <label for="usage">Usage</label>
            <input type="checkbox" id="usage" />
          </div>

          <span slot="footer" class="dialog-footer">
            <button type="sumbit">Add</button>
            <el-button @click="dialogVisible = false">Cancel</el-button>
          </span>
        </form>
      </el-dialog>
      <!-- end of file upload dialog  -->

      <!-- form dialog -->
      <el-dialog
        title="Register Harmful IP"
        :visible.sync="dialogFormVisible"
        width="90%"
      >
        <el-form :model="form">
          <el-form-item label="Ip address" :label-width="formLabelWidth">
            <el-input v-model="form.ip" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Usage" :label-width="formLabelWidth">
            <el-checkbox type="checkbox" id="usage" v-model="selected" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false"
            >Confirm</el-button
          >
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
        </span>
      </el-dialog>
      <!-- end of form dialog -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

const ipStore = "ipStore";

export default {
  name: "IpControlTable",
  data() {
    return {
      selected: false,
      dialogVisible: false,
      checkboxOption: {
        // row select change event
        selectedRowChange: ({ row, isSelected, selectedRowKeys }) => {
          console.log(row, isSelected, selectedRowKeys);
        },
        // selected all change event
        selectedAllChange: ({ isSelected, selectedRowKeys }) => {
          console.log(isSelected, selectedRowKeys);
        },
      },
      columns: [
        {
          field: "",
          key: "b",
          type: "checkbox",
          title: "",
          width: 50,
        },
        { field: "no", key: "a", title: "No" },
        { field: "ip", key: "c", title: "IP" },
        { field: "port", key: "d", title: "port" },
        { field: "url", key: "e", title: "URL" },
        { field: "usage", key: "f", title: "Usage" },
        {
          field: "detail",
          key: "g",
          title: "Detail",
          renderBodyCell: ({ row }) => {
            return (
              <span>
                <button
                  class="button-demo"
                  on-click={() => this.unRegisterHandler(row)}
                >
                  More
                </button>
              </span>
            );
          },
        },
        { field: "date", key: "h", title: "date" },
        {
          field: "mod",
          key: "i",
          title: "MOD",
          renderBodyCell: ({ row }) => {
            return (
              <span>
                <button
                  class="button-demo"
                  on-click={() => this.unRegisterHandler(row)}
                >
                  Mod
                </button>
              </span>
            );
          },
        },
      ],
      tableData: [],
      fileList: [],
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    // ...mapActions("ipStore", ["fetchIpList"]),
    // ...mapMutations("ipStore", []),

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 3, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
    },
    beforeRemove(file, fileList) {
      console.log(fileList);
      return this.$confirm(`Cancel the transfert of ${file.name} ?`);
    },
  },
  computed: {
    ...mapGetters(ipStore, ["allIpList"]),
  },
  created() {
    this.fetchIpList();
  },
};
</script>

<style scoped>
.btnContainer {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
}
.btnContainer button {
  margin-right: 10px;
}
</style>
