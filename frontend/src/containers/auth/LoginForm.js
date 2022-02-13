import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import AuthForm from '../../components/Auth/AuthForm';
import client from "../../client";
const queryString = require('query-string');


const LoginForm = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        setForm({
            ...form,
            [name]:value
        })
    };
    
    //폼 등록 이벤트 핸들러
    const onSubmit =e =>{
        e.preventDefault();
        const { email, password } = form;   
        const data = {
            email, password
        };
        client.post('/api/auth/login',queryString.stringify(data)).then(res => {
            localStorage.setItem("token", res.data.token );
            console.log(localStorage.getItem("token"))
            
            if(res.status === 200){
                window.location.href = '/main'
                localStorage.setItem("isAuthorized", "true")
                client.defaults.headers.common['x-access-token'] = res.data.token
            }
        })
    };

    // 컴포넌트가 처음 렌더링될때 form을 초기화함
    useEffect(() => {
        setForm({
            email: '',
            password: ''
        })
    }, []);

    return(
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
}

export default withRouter(LoginForm);