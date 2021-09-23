import React from 'react';
import AuthBlock from '../components/Login/AuthBlock';
import Title from '../components/Login/Title';
import RegisterForm from '../containers/auth/RegisterForm';

const RegisterPage = () => {
    return(
        <AuthBlock>
            <Title title="Funny Chatter"></Title>
            <RegisterForm></RegisterForm>
        </AuthBlock>
    );
};

export default RegisterPage;