import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import AuthForm from '../../components/Login/AuthForm';
import { check } from '../../modules/user';
import { changeField, initializeForm, register } from "../../modules/auth";
import { withRouter } from 'react-router-dom';


const RegisterForm = ({ history }) => {
    const dispatch = useDispatch();
    const { form, auth, authError, user} = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));

    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
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
        dispatch(register( {email, password, nickname, gender}));
    };

    // 컴포넌트가 처음 렌더링될때 form을 초기화함
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    //회원가입 성공/실패 처리
    useEffect(() => {
        if(authError){
            //계정이 이미 존재할 때
            if(authError.responses.status === 400){
                alert('이미 존재하는 계정명입니다.');
                return;
            }
            //기타 이유
            alert('회원가입 실패');
            console.log('오류 발생');
            console.log('authError');
            return;
        }
        if(auth){
            console.log('회원가입 성공');
            console.log(auth);
            dispatch(check());
        }
    },[auth, authError, dispatch]);

    //user 값이 잘 설정되었는지 확인
    useEffect(()=> {
        if (user) {
            console.log('check API 성공');
            console.log(user);
            history.push('/'); //홈화면으로 이동
        }
        try {
            localStorage.setItem('user', JSON.stringify(user));
        }catch(e){
            console.log('localStorage is not working');
        }
    },[history, user]);
    
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