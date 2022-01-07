import axios from "axios";

const loginStore = {
  namespaced: true,
  state: {
    usersData: {},
    usersList: [],
    userId: "",
    password: "",
    msg: "",
  },
  getters: {
    getUsersListAll: (state) => state.usersList,
    getUserId: (state) => state.userId,
    getUserPass: (state) => state.password,
  },
  actions: {
    async fetchUsersList({ commit }) {
      const response = await axios.get(
        "https://vue-axios-upload-default-rtdb.firebaseio.com/member.json"
      );
      let arr = [];
      if (response.data === null) {
        return;
      } else {
        Object.entries(response.data).forEach((val) => {
          const [key, value] = val;
          console.log(key);
          arr.push(value);
        });
      }
      commit("setUsersList", arr);
      commit("setUsersData", response.data);
    },
    async registerUser({ state, commit }, userInfo) {
      console.log(userInfo);
      const response = await axios.post(
        "https://vue-axios-upload-default-rtdb.firebaseio.com/member.json",
        userInfo
      );
      if (response.status === "OK") {
        state.msg = "Successfully registered";
      }

      commit("addUser", userInfo);
    },
    async removeUser({ state, commit }, userId) {
      function getKeyByValue(object, value) {
        return Object.keys(object).find((key) => object[key].uid === value);
      }
      const userToRemove = getKeyByValue(state.usersData, userId.uid);
      const response = await axios.delete(
        `https://vue-axios-upload-default-rtdb.firebaseio.com/member.json/${userToRemove}`
      );
      console.log(response);
      commit("deleteUser");
    },
  },
  mutations: {
    setUsersData(state, data) {
      state.usersData = data;
    },
    setUsersList(state, data) {
      state.usersList = data;
    },
    addUser(state, userInfo) {
      console.log(state.usersList);
      state.usersList = state.usersList.push(userInfo);
    },
    deleteUser(state, userId) {
      state.userList = state.userList.filter((user) => user.userId !== userId);
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
