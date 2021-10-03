import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import AuthForm from '../../components/Login/AuthForm';
import { changeField, initializeForm, register } from "../../modules/auth";
import { withRouter } from 'react-router-dom';


const RegisterForm = () => {
    const dispatch = useDispatch();
    const { form } = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));

    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({           // modules/auth
                form: 'register',
                key: name,
                value
            })
        );
    };

    //폼 등록 이벤트 핸들러
    const onSubmit =e =>{
        e.preventDefault();
        const { email, password, password2, nickname, gender} = form;
        // 하나라도 비어있다면
        if([email, password, password2, nickname].includes('')){
            alert('빈칸을 모두 입력하세요.');
            return;
        }
        if (password !== password2){
            alert('비밀번호가 일치하지 않습니다.');
            dispatch(changeField({from: 'register', key: 'password', value: ''}));
            dispatch(changeField({from: 'register', key: 'password2', value: ''}));
            return;
        }
        dispatch(register( {email, nickname, gender, password }));
    };

    // 컴포넌트가 처음 렌더링될때 form을 초기화함
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    
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