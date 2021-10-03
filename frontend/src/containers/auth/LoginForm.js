import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';
import AuthForm from '../../components/Login/AuthForm';
import { changeField, initializeForm, login } from "../../modules/auth";


const LoginForm = () => {
    const dispatch = useDispatch();
    const { form } = useSelector(({ auth,user }) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));

    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({       // modules/auth
                form: 'login',
                key: name,
                value
            })
        );
    };

    //폼 등록 이벤트 핸들러
    const onSubmit =e =>{
        e.preventDefault();
        const { email, password } = form;   
        dispatch(login({email, password}));
    };

    // 컴포넌트가 처음 렌더링될때 form을 초기화함
    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

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