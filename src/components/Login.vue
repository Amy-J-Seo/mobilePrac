<template>
  <div id="passChangeCard">
    <form @submit="checkForm">
      <div id="passChangeHeader">
        <h3>로그인</h3>
      </div>
      {{ validationMsg }}
      <hr />
      <br />
      <div class="form-control">
        <label for="id">아이디</label>
        <input type="text" name="id" v-model="id" />
      </div>
      <br />
      <div class="form-control">
        <label for="password">비밀번호</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <br />
      <br />
      <div id="btnContainer">
        <button type="submit">로그인</button>
        <button type="button" @click="registerBtnHandler">회원가입</button>
      </div>
    </form>

    <div>
      <h2>{{ success }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      validationMsg: "",
      success: "",
      id: "",
      password: "",
    };
  },
  methods: {
    checkForm(e) {
      e.preventDefault();
      const idIsValid = this.id.trim() !== "";
      const passIsValid = this.password.trim() !== "";

      if (!idIsValid || !passIsValid) {
        this.validationMsg = "Enter a valid id and password";
        return;
      }
      this.$store.commit("setUserId", this.id);
      this.$store.commit("setUserPass", this.password);

      this.$store.commit("logoutTimeout");
      localStorage.setItem(
        "loginInfo",
        JSON.stringify({
          userId: this.id,
          userPass: this.password,
          isLoggedIn: true,
        }),
        5000
      );
      this.success = "Login Success";
      this.$router.push("/about");
    },
    registerBtnHandler() {
      this.$router.push("/register");
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
