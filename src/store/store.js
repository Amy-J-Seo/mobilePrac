// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

// export const store = new Vuex.Store({
//   state: {
//     userId:
//       (localStorage.getItem("loginInfo") != null &&
//         JSON.parse(localStorage.getItem("loginInfo")).userId) ||
//       "",
//     password: "",
//     users: [],
//   },
//   getters: {
//     getUserId: (state) => {
//       console.log("getting user Id", state.userId);
//       return state.userId;
//     },
//     getUserPass: (state) => {
//       console.log("getting user Pass");
//       return state.password;
//     },
//     getUsersList: (state) => {
//       return state.users;
//     },
//   },
//   mutations: {
//     setUserId(state, userId) {
//       state.userId = userId;
//     },
//     setUserPass(state, userPass) {
//       state.password = userPass;
//     },
//     userLogOut(state) {
//       state.password = "";
//       state.userId = "";
//       localStorage.removeItem("loginInfo");
//     },
//     logoutTimeout(state) {
//       setTimeout(function () {
//         localStorage.removeItem("loginInfo");
//         state.password = "";
//         state.userId = "";
//       }, 120 * 1000);
//     },
//     registerUser(state, payload) {
//       const date = new Date();
//       state.users.push({
//         userId: payload.uid,
//         userPassword: payload.upassword,
//         userName: payload.uname,
//         userEmail: payload.uemail,
//         date: date.getMonth() + 1 + "/" + date.getDay(),
//         mod: "",
//       });
//     },
//     unRegisterUser(state, payload) {
//       const userToRemove = state.users.find((user) => {
//         return user.userId === payload;
//       });
//       // state.users = state.users.filter((user) => {
//       //   return user.userId !== userToRemove.userId;
//       // });
//       state.users.splice(state.users.indexOf(userToRemove), 1);
//     },
//   },
// });
