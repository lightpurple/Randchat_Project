import axios from "axios";

const client = axios.create({
  baseURL: 'http://localhost:5000',
  headers:{
    'Accept': 'application/json',
    "Content-Type":"application/x-www-form-urlencoded",
    // "Authorization":"x-access-token",
    "x-access-token": localStorage.getItem('user'),
  },
});

//헤더 설정
// client.defaults.headers.common['Authorization'] = 'x-access-token' ;

// 인터셉터 설정
// axios.interceptor.request.use(
//     response =>{
//         // 요청 성공 시 특정 작업 수행
//         return response;
//     },
//     error => {
//         //요청 실패시 특정 작업 수행
//         return Promise.reject(error);
//     }
// )

export default client;