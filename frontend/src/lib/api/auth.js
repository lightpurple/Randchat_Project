import client from "./client";
const queryString = require('query-string');

//로그인
export const login = ({email, password}) => {
    const data = {
        email, password
    };
    client.post('/auth/login',queryString.stringify(data)).then(res => {
        localStorage.setItem("token", res.data.token );
        console.log(localStorage.getItem("token"))
        
        if(res.status === 200){
            window.location.href = '/chat'
            localStorage.setItem("isAuthorized", "true")
            client.defaults.headers.common['x-access-token'] = res.data.token
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