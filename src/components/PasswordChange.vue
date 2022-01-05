<template>
  <div id="passChangeCard">
    <form action="">
      <div id="passChangeHeader">
        <h3>비밀번호 변경</h3>
        <button id="closeBtn">X</button>
      </div>

      <hr />
      <br />
      <div class="form-control">
        <label for="prePassword">기존 비밀번호</label>
        <input type="text" name="prePassword" id="prePassword" />
      </div>
      <br />
      <div class="form-control">
        <label for="newPassword">새 비밀번호</label>
        <input type="text" name="newPassword" id="newPassword" />
      </div>
      <br />
      <div class="form-control">
        <label for="newPassConfirm">새 비밀번호 확인</label>
        <input type="text" name="newPassConfirm" id="newPassConfirm" />
      </div>
      <br />
      <div id="btnContainer">
        <button type="reset">Cancel</button>
        <button>Ok</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
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
