import axios from "axios";

const ipStore = {
  namespaced: true,
  state: {
    ipList: [],
    apiTable: [],
  },
  getters: {
    allIpList: (state) => state.ipList,
  },
  actions: {
    async fetchIpList({ commit }) {
      const response = await axios.get(
        "https://vue-axios-19187-default-rtdb.firebaseio.com/ipList.json"
      );
      console.log("FireBase Data", response.data);
      const respData = response.data;
      console.log(respData);
      let newArr = [];
      for (let i = 0; i < respData.length; i++) {
        newArr.push({
          rowKey: i + 1,
          ip: respData[i].ip,
          port: respData[i].port,
          url: respData[i].url,
          usage: respData[i].usage,
          date: respData[i].date,
        });
      }
      console.log("We are making new array", newArr);
      commit("setIpList", newArr);
    },
    async addNewIp({ commit }, data) {
      const resp = await axios.post(
        "https://vue-axios-19187-default-rtdb.firebaseio.com/ipList.json",
        {
          data: data,
        }
      );
      const respData = resp.data;
      let newArr = [];
      for (let i = 0; i < respData.length; i++) {
        newArr.push({
          rowKey: i + 1,
          ip: respData[i].ip,
          port: respData[i].port,
          url: respData[i].url,
          usage: respData[i].usage,
          date: respData[i].date,
        });
      }
      commit("", resp);
    },
  },
  mutations: {
    setIpList: (state, ipList) => (state.ipList = ipList),
    addNewIpList(state, apiTable) {
      state.apiTable = apiTable;
    },
  },
};
export default ipStore;
