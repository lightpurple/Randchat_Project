import React from 'react';
import AuthBlock from '../components/Login/AuthBlock';
import Title from '../components/Login/Title';
import LoginForm from '../containers/auth/LoginForm';
import Footer from '../components/Footer';

const LoginPage = () =>{
    return (
        <AuthBlock>
            <Title title="가볍게 상대방과 하는 채팅"></Title>
            <LoginForm/>
            <hr/>
            <Footer/>
        </AuthBlock>
    );
};

export default LoginPage;