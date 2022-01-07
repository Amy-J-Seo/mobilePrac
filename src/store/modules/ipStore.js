import axios from "axios";

const ipStore = {
  namespaced: true,
  state: {
    ipLength: 0,
    ipList: [],
    ipResponseData: {},
  },
  getters: {
    allIpList: (state) => state.ipList,
    ipLength: (state) => state.ipLength,
  },
  actions: {
    async fetchIpList({ commit }) {
      const response = await axios.get(
        "https://vue-axios-19187-default-rtdb.firebaseio.com/ipList.json"
      );
      let arr = [];
      console.log(response.data);
      if (response.data === null) {
        return;
      } else {
        Object.entries(response.data).forEach((val) => {
          const [key, value] = val;
          console.log(key);
          arr.push(value);
        });
      }

      commit("setIpList", arr);
      commit("getIpLength");
      commit("setIpResponse", response.data);
    },
    async addNewIp({ commit }, data) {
      console.log("data check from ipstore", data);
      const resp = await axios.post(
        "https://vue-axios-19187-default-rtdb.firebaseio.com/ipList.json",
        data
      );
      console.log("data check from ipstore", data.rowKey);
      commit("addNewIpList", resp);
    },
    async removeIp({ state, commit }, no) {
      console.log(state.ipResponseData);

      function getKeyByValue(object, value) {
        return Object.keys(object).find((key) => object[key].no === value);
      }
      const ipToRemove = getKeyByValue(state.ipResponseData, no);

      await axios.delete(
        `https://vue-axios-19187-default-rtdb.firebaseio.com/ipList.json/${ipToRemove}`
      );
      commit("deleteIp", no);
    },
  },
  mutations: {
    getIpLength: (state) => {
      state.ipLength = state.ipList.length;
    },
    setIpList: (state, ipList) => (state.ipList = ipList),
    setIpResponse: (state, data) => (state.ipResponseData = data),
    addNewIpList(state, newIpInfo) {
      state.ipList.push(newIpInfo);
    },
    deleteIp(state, ipNo) {
      state.ipList.filter((ipList) => ipList.id !== ipNo);
    },
  },
};
export default ipStore;
