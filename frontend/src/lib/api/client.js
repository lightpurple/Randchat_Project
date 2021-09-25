import axios from "axios";

const client = axios.create({
  // baseURL: 'https://bit.ly/3ABatrD',
  baseURL: 'http://localhost:5000',
  headers:{
    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
    "Accept": "*/*",
  },
  // withCredentials : true
});

// const client = axios.create();
//헤더 설정
// client.defaults.baseURL = "https://bit.ly/3ABatrD";
// client.defaults.withCredentials = true;
// client.defaults.headers.common['Authorization'] = 'x-access-token' ;


export default client;