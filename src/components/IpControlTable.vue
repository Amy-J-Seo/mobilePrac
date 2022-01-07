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
        <el-upload
          class="upload-demo"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          action="https://vue-axios-upload-default-rtdb.firebaseio.com/fileUp.json"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">Click to upload</el-button>
          <div slot="tip" class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </el-upload>

        <span slot="footer" class="dialog-footer">
          <el-button>Add</el-button>
          <el-button @click="dialogVisible = false">Cancel</el-button>
        </span>
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
          <el-form-item label="Port" :label-width="formLabelWidth">
            <el-input v-model="form.port" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="URL" :label-width="formLabelWidth">
            <el-input v-model="form.url" id="url" utocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Usage" :label-width="formLabelWidth">
            <el-checkbox type="checkbox" id="usage" v-model="form.usage" />
          </el-form-item>
          <el-form-item label="Date" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="Pick a day"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addIpHandler">Confirm</el-button>
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
          renderBodyCell: () => {
            return (
              <span>
                <button class="button-demo">More</button>
              </span>
            );
          },
        },
        { field: "date", key: "h", title: "date" },
        {
          field: "mod",
          key: "i",
          title: "Del",
          renderBodyCell: ({ row, rowIndex }) => {
            return (
              <span>
                <button
                  class="button-demo"
                  on-click={() => this.ipDeleteHandler(row, rowIndex)}
                >
                  Del
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
        ip: "",
        port: "",
        url: "",
        usage: false,
        date: "",
      },
      formLabelWidth: "120px",
      uploadFile: {
        fileName: "",
        url: "",
      },
    };
  },
  methods: {
    ...mapActions(ipStore, ["fetchIpList", "addNewIp", "removeIp"]),
    ...mapMutations(ipStore, []),
    increaseNum() {
      this.inputFormNo = this.inputFormNo + 10;
      this.rowKey = this.rowKey + 10;
    },
    addFileBtnHandler() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file.name);
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
    addIpHandler() {
      this.dialogFormVisible = false;

      const dataToSend = {
        no: this.ipLength,
        rowKey: this.ipLength * 1000,
        ip: this.form.ip,
        port: this.form.port,
        url: this.form.url,
        usage: this.form.usage,
        date: this.form.date,
      };
      this.addNewIp(dataToSend);
    },
    ipDeleteHandler(row, rowIndex) {
      this.tableData.splice(rowIndex, 1);
      const no = row.no;
      this.removeIp(no);
    },
  },
  computed: {
    ...mapGetters(ipStore, ["allIpList", "ipLength"]),
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
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: auto;
}
</style>
