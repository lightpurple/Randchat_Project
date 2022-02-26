import axios from "axios";

const client = axios.create({
  baseURL: 'http://ec2-13-124-78-4.ap-northeast-2.compute.amazonaws.com',
  headers:{
    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
    "Accept": "*/*",
    'x-access-token':`${localStorage.getItem('token')}`,
  },
  // withCredentials : true
});


// 

client.interceptors.response.use(
  response =>{
    
    return response;
  }, error => {
      // if(error.response.data.msg === "Password is incorrect!"){
      //   //Request failed with status code 400
      //   alert('잘못된 이메일/비밀번호 입니다.');
      // }
      // if(error.response.data.msg === "User is aleady exist!"){
      //   //Request failed with status code 400
      //   alert('존재하는 이메일입니다.');
      // }
      // if(error.response.status === undefined) {
      //   alert('실패')
      // }
      if(error.response.status === 400){
        alert('실패')
        console.log(error.response)
      }
      
      else{alert('실패')}
      return Promise.reject(error);
    },
)

export default client;