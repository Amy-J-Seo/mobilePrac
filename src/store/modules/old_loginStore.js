import axios from "axios";

const loginStore = {
  namespaced: true,
  state: {
    usersList: [],
    userId:
      (localStorage.getItem("loginInfo") != null &&
        JSON.parse(localStorage.getItem("loginInfo")).userId) ||
      "",
    password: "",
  },
  getters: {
    getUserId: (state) => {
      console.log("getting user Id", state.userId);
      return state.userId;
    },
    getUserPass: (state) => {
      console.log("getting user Pass");
      return state.password;
    },
    getUsersList: (state) => {
      return state.usersList;
    },
  },
  actions: {
    async fetchUsersList({ commit }) {
      const response = await axios.get(
        "https://vue-axios-upload-default-rtdb.firebaseio.com/member.json"
      );
      console.log(response.data);
      commit("getUsersList");
    },
    registerUser() {},
  },
  mutations: {
    getUsersList(state, data) {
      state.usersList = data;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setUserPass(state, userPass) {
      state.password = userPass;
    },
    userLogOut(state) {
      state.password = "";
      state.userId = "";
      localStorage.removeItem("loginInfo");
    },
    logoutTimeout(state) {
      setTimeout(function () {
        localStorage.removeItem("loginInfo");
        state.password = "";
        state.userId = "";
      }, 120 * 1000);
    },
    registerUser(state, payload) {
      const date = new Date();
      state.usersList.push({
        userId: payload.uid,
        userPassword: payload.upassword,
        userName: payload.uname,
        userEmail: payload.uemail,
        date: date.getMonth() + 1 + "/" + date.getDay(),
        mod: "",
      });
    },
    unRegisterUser(state, payload) {
      const userToRemove = state.usersList.find((user) => {
        return user.userId === payload;
      });
      state.usersList.splice(state.usersList.indexOf(userToRemove), 1);
    },
  },
};

export default loginStore;
