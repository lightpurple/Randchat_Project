import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import Title from '../components/Title';
import './SignUp.css';

const SignUp = () => {
    const [id, setId] = useState("");
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [nickname, setNickName] = useState('');
    const [email, setEmail] = useState('');
    const [passwordError,setPasswordError] = useState(false);
    const [errors, setErrors] = useState(false);
    
    const onChangeId = (e) => {
        setId(e.target.value)
    }
    
    const onChangePwd1 = (e) => {
        setPassword1(e.target.value)
    }
    
    const onChangePwd2 = (e) => {
        setPasswordError(e.target.value !== password1);
        setPassword2(e.target.value)
    }

    const onChangeNcik = (e) => {
        setNickName(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
    
        const user = {
            id: id,
            password1: password1,
            password2: password2,
            nickname: nickname,
            email: email
        }
    
        // 유효성 검사
        if(password1 !== password2) {
            return setPasswordError(true);
        }
    
        Axios.post('#', user)
            .then(res => {
                if (res.data.key) {
                localStorage.clear()
                localStorage.setItem('token', res.data.key)
                // 사용하려면 App.js에서 /로 라우팅해야 한다
                window.location.replace('/')
                } else {
                    setId('');
                    setPassword1('');
                    setPassword2('');
                    setNickName(' ');
                    setEmail(' ');
                localStorage.clear()
                setErrors(true)
                }
            })
            .catch(err => {
                console.clear()
                alert('아이디 혹은 비밀번호가 일치하지 않습니다')
            })
        }

    return(
        <div>
            <Title title="회원가입"></Title>
            {errors === true}
            <form className="signupform" onSubmit={onSubmit}>
                <div className="wrapper">
                
                    <input 
                        id="id" 
                        type="id" 
                        value={id}
                        onChange={onChangeId}
                        required
                        className="signbox2" placeholder="아이디"
                    />{' '}

                    <input 
                        id="password1"
                        type="password" 
                        value={password1}
                        onChange={onChangePwd1}
                        required
                        className="signbox2" 
                        placeholder="비밀번호 (소문자, 숫자, 특수문자 포함 8~16자)"
                        pattern='^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?])[a-z\d$@$!%*#?]{8,16}$'
                        minLength='8'
                    />{' '}


                    <input 
                        id="password2" 
                        type="password"
                        value={password2}
                        onChange={onChangePwd2}
                        required
                        className="signbox2" 
                        placeholder="비밀번호 확인 (소문자, 숫자, 특수문자 포함 8~16자)"
                        pattern='^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?])[a-z\d$@$!%*#?]{8,16}$'
                        minLength='8'
                    />{' '}
                    {passwordError && <div style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>}

                    <input 
                        id="nickname" 
                        type="id" 
                        value={nickname}
                        onChange={onChangeNcik}
                        required
                        className="signbox2" placeholder="닉네임"
                    />


                    <input 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={onChangeEmail}
                        required
                        className="signbox2" placeholder="이메일"
                    />
                    

                    <input type='submit' className="signupbtn"  value='회원가입' />

                </div>
            </form>
        </div>
    );
}

export default SignUp;