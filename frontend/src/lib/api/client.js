import axios from "axios";

// const client = axios.create();
const EMPLOYEE_API_BASE_URL = "http://ec2-3-36-118-135.ap-northeast-2.compute.amazonaws.com:8080/";

class client {

    getEmotions(){
      return axios.get(EMPLOYEE_API_BASE_URL)
    }
  
  }
// 글로벌 설정예시:
//API 주소를 다른 곳으로 사용함
// client.defaults.baseURL= 'http://external-api-server.com/'

// //헤더 설정
// client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

// // 인터셉터 설정
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

export default new client();