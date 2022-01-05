import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userId:
      (localStorage.getItem("loginInfo") != null &&
        JSON.parse(localStorage.getItem("loginInfo")).userId) ||
      "",
    password: "",
    todos: [
      { id: 1, text: "1", done: true },
      { id: 2, text: "d", done: true },
      { id: 3, text: "3", done: true },
      { id: 4, text: "4", done: true },
      { id: 5, text: "5", done: false },
      { id: 6, text: "6", done: false },
    ],
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
    doneTodos: (state) => {
      return state.todos.filter((toda) => toda.done);
    },
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
      console.log("userId updated", state.userId);
    },
    setUserPass(state, userPass) {
      state.password = userPass;
      console.log("password updated", state.password);
    },
  },
});
