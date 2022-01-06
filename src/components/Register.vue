<template>
  <div>
    <div id="userRegisterCard">
      <h2>Register</h2>
      <form @submit.prevent="registerUserHandler">
        <hr />
        <br />
        <div class="form-control">
          <label for="id">아이디</label>
          <input
            type="text"
            name="id"
            v-model="uid"
            placeholder="Enter your id"
          />
        </div>
        <br />
        <div class="form-control">
          <label for="password">비밀번호</label>
          <input
            type="password"
            name="password"
            v-model="upassword"
            placeholder="Enter your password"
          />
        </div>
        <br />
        <div class="form-control">
          <label for="name">이름</label>
          <input
            type="text"
            name="name"
            v-model="uname"
            placeholder="Enter your name"
          />
        </div>
        <br />
        <div class="form-control">
          <label for="email">이메일</label>
          <input
            type="email"
            name="email"
            v-model="uemail"
            placeholder="Enter your email"
          />
        </div>
        <br />
        <div id="btnContainer">
          <button type="submit">등록하기</button>
          <el-button type="primary" @click="dialogVisible = true">
            Return to Main
          </el-button>
          <el-dialog title="Test" :visible.sync="dialogVisible" width="70%">
            <span>Sure want to go back to Main page?</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="returnToMainHandler"
                >Confirm</el-button
              >
              <el-button @click="dialogVisible = false">Cancel</el-button>
            </span>
          </el-dialog>
        </div>
      </form>
    </div>

    <!-- userList table -->
    <div id="lowerPart">
      <h4>Registered User</h4>
      <ve-table :columns="columns" :table-data="tableData"></ve-table>
    </div>
  </div>
</template>

<script>
import "vue-easytable/libs/theme-default/index.css";

export default {
  name: "Register",
  data() {
    return {
      dialogVisible: false,
      uid: "",
      upassword: "",
      uname: "",
      uemail: "",
      columns: [
        { field: "userId", key: "a", title: "ID" },
        { field: "userName", key: "c", title: "Name" },
        { field: "userEmail", key: "d", title: "Email" },
        { field: "date", key: "e", title: "Date" },
        {
          field: "mod",
          key: "f",
          title: "MOD",
          renderBodyCell: ({ row }) => {
            return (
              <span>
                <button
                  class="button-demo"
                  on-click={() => this.unRegisterHandler(row)}
                >
                  Unregister
                </button>
              </span>
            );
          },
        },
      ],
      tableData: this.$store.state.users,
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    returnToMainHandler() {
      this.dialogVisible = false;
      this.$router.push("/main");
    },
    registerUserHandler() {
      console.log(this.uid, this.upassword, this.uname, this.uemail);
      this.$store.commit("registerUser", {
        uid: this.uid,
        upassword: this.upassword,
        uname: this.uname,
        uemail: this.uemail,
      });
      this.uid = "";
      this.upassword = "";
      this.uname = "";
      this.uemail = "";
    },
    unRegisterHandler(row) {
      console.log(row.userId);
      this.$store.commit("unRegisterUser", row.userId);
    },
  },
};
</script>

<style scoped>
#userRegisterCard {
  margin: auto;
  width: 70%;
  border: 1px solid rgb(156, 156, 156);
  background-color: rgb(226, 223, 219);
  padding: 10px;
}

#btnContainer {
  display: flex;
  justify-content: center;
}
#btnContainer button {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
