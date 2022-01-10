import axios from "axios";

const ipStore = {
  namespaced: true,
  state: {
    ipLength: 0,
    ipList: [],
    ipResponseData: {},
  },
  getters: {
    //   allIpList: (state) => state.ipList,
    //ipLength: (state) => state.ipLength,
  },
  mutations: {
    // setIpLength: (state) => {
    //   console.log("from the store checking ipLength", state.ipLength);
    // },
    setIpList: (state, ipList) => {
      state.ipList = ipList;
      state.ipLength = state.ipList.length;
    },
    setIpResponse: (state, data) => {
      state.ipResponseData = data;
    },
    addNewIpList(state, newIpInfo) {
      state.ipList.push(newIpInfo);
    },
    deleteIp(state, ipNo) {
      state.ipList.filter((ipList) => ipList.id !== ipNo);
    },
  },
  actions: {
    async fetchIpList({ commit }) {
      const response = await axios.get(
        "https://vue-axios-19187-default-rtdb.firebaseio.com/ipList.json"
      );
      let arr = [];
      //console.log(response.data);
      if (response.data === null) {
        return;
      } else {
        Object.entries(response.data).forEach((val) => {
          val.rowKey = val.no;
          const [key, value] = val;
          arr.push({
            rowKey: key,
            no: value.no,
            ip: value.ip,
            port: value.port,
            url: value.url,
            usage: value.usage,
            date: value.date,
          });
        });

        // for (let key = 0; key < response.data.length; key++) {
        //   arr.push({
        //     rowKey: key + 1,
        //     no: response[key] + 20,
        //     ip: response[key].ip,
        //     port: response[key].port,
        //     url: response[key].url,
        //     usage: response[key].usage,
        //     date: response[key].date,
        //   });
        // }
      }
      // arr.forEach((item, index) => {
      //   item.rowKey = index + 1;
      // });

      console.log(arr[0].rowKey);
      commit("setIpList", arr);
      commit("setIpResponse", response.data);
    },
    async addNewIp({ commit }, data) {
      console.log("data check from ipstore", data);
      const resp = await axios.post(
        "https://vue-axios-19187-default-rtdb.firebaseio.com/ipList.json",
        data
      );

      commit("addNewIpList", resp);
    },
    async removeIp({ state, commit }, no) {
      console.log(state.ipResponseData);

      function getKeyByValue(object, value) {
        return Object.keys(object).find((key) => object[key].no === value);
      }
      const ipToRemove = getKeyByValue(state.ipResponseData, no);
      console.log(ipToRemove);

      await axios.delete(
        `https://vue-axios-19187-default-rtdb.firebaseio.com/ipList/${ipToRemove}.json`
      );
      commit("deleteIp", no);
    },
  },
};
export default ipStore;
