import React, { useEffect, useState } from 'react';
import AuthForm from '../../components/Auth/AuthForm';
import { withRouter } from 'react-router-dom';
import client from "../../client";
const queryString = require('query-string');


const RegisterForm = () => {

    const [form, setForm] = useState({
        email: '',
        password: '',
        password2: '',
        nickname: '',
        gender:'',
    })

    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        setForm({
            ...form,
            [name] : value
        })
    };

    //폼 등록 이벤트 핸들러
    const onSubmit =e =>{
        console.log("회원가입")
        e.preventDefault();
        const { email, password, password2, nickname, gender} = form;
        // 하나라도 비어있다면
        if([email, password, password2, nickname].includes('')){
            alert('빈칸을 모두 입력하세요.');
            return;
        }
        if (password !== password2){
            alert('비밀번호가 일치하지 않습니다.');
            setForm({
                ...form,
                password: '',
                password2: '',
            })
            return;
        }
        const data = {
            email, nickname, gender, password
        };
        client.post('/api/auth/signup',queryString.stringify(data)).then(res => {
            console.log(res)
            console.log(data)
    
            if(res.status=== 200){
                console.log('회원가입 성공');
                alert('회원가입 성공');
                document.location.href = '/'
            }
            
        }) 
    };

    // 컴포넌트가 처음 렌더링될때 form을 초기화함
    useEffect(() => {
        setForm({
            email: '',
            password: '',
            password2: '',
            nickname: '',
            gender:'',
        })
    }, []);

    
    return(
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
}

export default withRouter(RegisterForm);