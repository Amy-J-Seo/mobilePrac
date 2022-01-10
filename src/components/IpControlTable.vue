<template>
  <div>
    <div id="controlTable">
      <ve-table
        :columns="columns"
        :table-data="this.ipList"
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

      <!-- detailbtn contents update dialog -->
      <el-dialog
        title="Update Registered IP"
        :visible.sync="dialogDetailVisible"
        width="90%"
      >
        <el-form :model="updateFrm">
          <el-form-item label="Ip address" :label-width="formLabelWidth">
            <el-input v-model="updateFrm.ip" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Port" :label-width="formLabelWidth">
            <el-input v-model="updateFrm.port" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="URL" :label-width="formLabelWidth">
            <el-input
              v-model="updateFrm.url"
              id="url"
              utocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="Usage" :label-width="formLabelWidth">
            <el-checkbox type="checkbox" id="usage" v-model="updateFrm.usage" />
          </el-form-item>
          <el-form-item label="Date" :label-width="formLabelWidth">
            <el-date-picker
              v-model="updateFrm.date"
              type="date"
              placeholder="Pick a day"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateIpHandler">Update</el-button>
          <el-button @click="dialogDetailVisible = false">Cancel</el-button>
        </span>
      </el-dialog>
      <!-- end of  detailbtn contents update dialog -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

const ipStore = "ipStore";

export default {
  name: "IpControlTable",
  data() {
    return {
      ipLength: 0,
      selected: false,
      dialogVisible: false,
      dialogDetailVisible: false,
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
          renderBodyCell: (row, rowIndex) => {
            return (
              <span>
                <button
                  class="button-demo"
                  on-click={() => this.updateFrmHandler(row, rowIndex)}
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
      updateFrm: {
        no: "",
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
    ...mapActions(ipStore, ["fetchIpList", "addNewIp", "removeIp", "updateIp"]),
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
      console.log("from table onclickaddbtn", this.ipLength);
      const dataToSend = {
        no: this.ipLength + 1,
        ip: this.form.ip,
        port: this.form.port,
        url: this.form.url,
        usage: this.form.usage,
        date: this.form.date,
      };
      this.addNewIp(dataToSend);
    },
    ipDeleteHandler(row, rowIndex) {
      this.ipList.splice(rowIndex, 1);
      const no = row.no;
      this.removeIp(no);
    },
    updateFrmHandler(row) {
      this.dialogDetailVisible = true;
      const ipToUpdate = this.ipList.find((ip) => ip.no === row.row.no);
      this.updateFrm.no = ipToUpdate.no;
      this.updateFrm.ip = ipToUpdate.ip;
      this.updateFrm.port = ipToUpdate.port;
      this.updateFrm.url = ipToUpdate.url;
      this.updateFrm.usage = ipToUpdate.usage;
      this.updateFrm.date = ipToUpdate.date;

      console.log(row.row.no, "update frm is visible");
    },
    updateIpHandler() {
      this.dialogDetailVisible = false;
      const dataToSend = {
        no: this.updateFrm.no,
        ip: this.updateFrm.ip,
        port: this.updateFrm.port,
        url: this.updateFrm.url,
        usage: this.updateFrm.usage,
        date: this.updateFrm.date,
      };
      this.updateIp(dataToSend);
      const rowIndexToUpdate = this.ipList.findIndex(
        (item) => item.no === dataToSend.no
      );
      console.log(this.ipList[rowIndexToUpdate]);
      this.ipList[rowIndexToUpdate] = dataToSend; //?????
    },
  },
  computed: {
    ...mapGetters(ipStore, []),
    ...mapState(
      ipStore,
      ["ipList"]
      //   {
      //   apiIpLength: (state) => {
      //     console.log(state.ipStore.ipLength);
      //     this.ipLength = state.ipStore.ipLength;
      //   },
      //   apiDate: (state) => state.ipStore.ipList,
      // }
    ),
  },
  // watch: {
  //   ipList: function (newList) {
  //     this.ipList = newList;
  //   }, //??????
  // },
  created() {
    this.fetchIpList();
  },
  mounted() {
    this.ipLength = this.ipList.length;
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
