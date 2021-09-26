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
        }
    })
    
}

//회원가입
export const register = ( {email, nickname, gender, password} ) => {
    const data = {
        email, nickname, gender, password
    };
    client.post('/auth/signup',JSON.stringify(data)).then(res => {
        console.log(res)
        console.log(data)
    })
}

// 로그인 상태 확인
// export const check = () => {
//     client.get('/auth/check').then(response => {
//     });
// }

//로그아웃
export const logout = () => client.post('/auth/logout');