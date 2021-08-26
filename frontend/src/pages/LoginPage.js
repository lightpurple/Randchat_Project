import React from 'react';
import Title from '../components/Login/Title';
import LoginForm from '../containers/auth/LoginForm';

const LoginPage = () =>{
    return (
        <div>
            <Title title="Funny Chatter"></Title>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;