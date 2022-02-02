import React from 'react';
import AuthBlock from '../components/Login/AuthBlock';
import AuthTitle from '../components/Login/AuthTitle';
import LoginForm from '../containers/auth/LoginForm';
import Footer from '../components/Footer';

const LoginPage = () =>{
    return (
        <AuthBlock>
            <AuthTitle title="가볍게 상대방과 하는 채팅"></AuthTitle>
            <LoginForm/>
            <hr/>
            <Footer/>
        </AuthBlock>
    );
};

export default LoginPage;