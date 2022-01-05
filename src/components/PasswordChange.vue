<template>
  <div id="passChangeCard">
    <form @submit="changePassword">
      <div id="passChangeHeader">
        <h3>비밀번호 변경</h3>
        <button id="closeBtn">X</button>
      </div>

      <hr />
      <br />
      <div class="form-control">
        <label for="enteredPrePass">기존 비밀번호</label>
        <input
          type="password"
          name="enteredPrePass"
          v-model="enteredPrePass"
          v-on:keyup="checkPrePass"
        />
      </div>
      <br />
      <div class="form-control">
        <label for="newPassword">새 비밀번호</label>
        <input type="password" name="newPassword" v-model="newPassword" />
      </div>
      <br />
      <div class="form-control">
        <label for="newPassConfirm">새 비밀번호 확인</label>
        <input
          type="password"
          name="newPassConfirm"
          v-model="passwordConfirm"
        />
      </div>
      <h3>{{ errorMsg }}</h3>
      <br />
      <div id="btnContainer">
        <button type="submit">Ok</button>
        <button type="reset">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "PasswordChange",
  data() {
    return {
      prePassword: this.$store.getters.getUserPass,
      enteredPrePass: "",
      newPassword: "",
      passwordConfirm: "",
      errorMsg: "",
    };
  },
  methods: {
    checkPrePass() {
      if (this.prePassword !== this.enteredPrePass) {
        this.errorMsg = " Enter a vaild password ";
        return;
      }
      this.errorMsg = "";
    },
    changePassword(e) {
      e.preventDefault();

      const enteredPass = this.newPassword.trim();
      const confirmEnteredPass = this.passwordConfirm.trim();
      if (enteredPass === "") {
        return;
      }
      if (enteredPass !== confirmEnteredPass) {
        this.errorMsg = " please check your new password and try again!";
        return;
      }

      this.errorMsg = "";
      alert("password changed");
    },
  },
};
</script>

<style scoped>
#passChangeCard {
  margin: auto;
  width: 70%;
  border: 1px solid rgb(156, 156, 156);
  background-color: rgb(226, 223, 219);
  padding: 10px;
}
#closeBtn {
  float: right;
  height: 20px;
  all: unset;
  color: rgb(126, 126, 126);
}
#passChangeHeader {
  display: inline-flex;
  justify-content: center;
  width: 100%;
  align-items: center;
}
#passChangeHeader h3 {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 3px;
  margin-top: 3px;
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
