import client from "./client";
const queryString = require('query-string');

//로그인
export const login = ({email, password}) => {
    const data = {
        email, password
    };
    client.post('/auth/login',queryString.stringify(data)).then(res => {
        const {accessToken} = res.data;
        client.defaults.headers.common['x-access-token'] = `Bearer ${accessToken}`;
        console.log(res)
        if(res.status === 200){
            var token = res.data.token;
            localStorage.setItem("token", token);
            document.location.href = '/chat'
        }
    })
}

//회원가입
export const register = ( {email, nickname, gender, password} ) => {
    const data = {
        email, nickname, gender, password
    };
    client.post('/auth/signup',queryString.stringify(data)).then(res => {
        console.log(res)
        console.log(data)

        if(res.status=== 200){
            console.log('회원가입 성공');
            alert('회원가입 성공');
            document.location.href = '/'
        }
        
    }) 
}