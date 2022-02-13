import React from 'react';
import AuthBlock from '../components/Auth/AuthBlock';
import Title from '../components/Auth/Title';
import RegisterForm from '../containers/Auth/RegisterForm';

const RegisterPage = () => {
    return(
        <AuthBlock>
            <Title title="가볍게 상대방과 하는 채팅"></Title>
            <RegisterForm></RegisterForm>
        </AuthBlock>
    );
};

export default RegisterPage;