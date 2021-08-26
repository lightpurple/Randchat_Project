import React from 'react';
import Title from '../components/Login/Title';
import RegisterForm from '../containers/auth/RegisterForm';

const RegisterPage = () => {
    return(
        <div>
            <Title title="회원가입"></Title>
            <RegisterForm></RegisterForm>
        </div>
    );
};

export default RegisterPage;