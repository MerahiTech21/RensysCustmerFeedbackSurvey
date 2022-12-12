import axios from "axios";
let apiClient = axios.create({
  baseURL: "http://survey.merahitechnologies.com/",
  // baseURL: "http://192.168.0.9:5000/",

  // headers: {

  //     Accept: 'application/json',
  //    'Content-Type': 'application/json',
  //    Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     }
});

apiClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    const token = localStorage.getItem("token");
      config.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ? token :'' }`,
      };
    

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default apiClient;
