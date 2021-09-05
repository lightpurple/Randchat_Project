import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';
import AuthForm from '../../components/Login/AuthForm';
import { changeField, initializeForm, login } from "../../modules/auth";
import { check } from '../../modules/user';


const LoginForm = ({ history }) => {
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth,user }) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));

    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name} = e.target;
        dispatch(
            changeField({
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

    useEffect(()=>{
        if(authError){
            console.log('오류 발생');
            console.log(authError);
            alert("로그인 실패");
            return;
        }
        if(auth){
            console.log('로그인 성공');
            dispatch(check());
        }
    },[auth, authError, dispatch]);

    // user값이 잘 설정되었는지 확인
    useEffect(() =>{
        if(user) {
            history.push('/chat');
            try{
                localStorage.setItem('user',JSON.stringify(user));
            } catch(e){
                console.log('localStorage is not working');
            }
        }
    },[history, user]);

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