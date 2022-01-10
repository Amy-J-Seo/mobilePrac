import baseUrl from "./http";

export const getData = () => {
  return baseUrl.get("/ipList.json");
};

// class Api {
//   getData() {
//     console.log(baseUrl);
//     return baseUrl("/ipList.json");
//   }
// }

// export default new Api();
