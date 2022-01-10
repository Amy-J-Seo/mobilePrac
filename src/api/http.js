import axios from "axios";

const baseUrl = () =>
  axios.create({
    baseURL: "https://vue-axios-19187-default-rtdb.firebaseio.com",
  });

export default baseUrl;
