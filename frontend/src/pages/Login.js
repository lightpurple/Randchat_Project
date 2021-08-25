import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { Input } from 'antd';
import Title from '../components/Title';
import naverbtn from './naverbtn.png';
import './Login.css';

const Login =() => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
    
        const user = {
          id: id,
          password: password
        };
    
        Axios.post('/api/v1/mall/auth/login/', user)
        .then(res => {
          if (res.data.key) {
            localStorage.clear()
            localStorage.setItem('token', res.data.key)
            window.location.replace('/')
          } else {
            setId('')
            setPassword('')
            localStorage.clear()
            setErrors(true)
          }
        })
        .catch(err => {
            console.clear()
            alert('아이디 또는 비밀번호가 일치하지 않습니다')
            setId('')
            setPassword('')
        })
    }


    return (
        <div className= "back" >
            <Title title="Funny Chatter"></Title>
            {errors === true}
            <form className="loginform" onSubmit={onSubmit}>
                <div className="wrapper">
                    <p className="logintitle">아이디</p>
                    <input 
                        id="id" 
                        type="id" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                        className="box"
                    />{' '}
                        
                    <p className="logintitle">비밀번호</p>
                    <input 
                        id="password" 
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        // onKeyPress={handleKeyPress} 
                        className="box"
                    />{' '}

                    <input type='submit' value='로그인' className="btn1" />
                    <button className="btn2">
                        <Link to="/SignUp" className="btnName">회원가입</Link>
                    </button>

                    

                        {/* <Link to="/"><img 
                            className="join" 
                            src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_wide.png"
                            /></Link>

                            <Link to ="/"><img 
                            src={naverbtn} 
                            className="join"/></Link> */}

                </div>
            </form>
        </div>
    )

}

export default Login;