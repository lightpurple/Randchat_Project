import React from 'react';
import AuthBlock from '../components/Login/AuthBlock';
import Title from '../components/Login/Title';
import LoginForm from '../containers/auth/LoginForm';

const LoginPage = () =>{
    return (
        <AuthBlock>
            <Title title="Funny Chatter"></Title>
            <LoginForm/>
        </AuthBlock>
    );
};

export default LoginPage;