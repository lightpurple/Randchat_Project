import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/AuthForm.css';

const textMap = {
    login: '로그인',
    register: '회원가입',
};


const AuthForm = ({type, form, onChange, onSubmit }) =>{
    const text = textMap[type];
    return(
        <div className="block">
            <form className="form" onSubmit={onSubmit}>
                
                { type === 'login' && <p className="logintitle">아이디</p>}
                <input autoComplete="id" name="id" className={type === "login"? "box" : "registerbox"} placeholder={type === "login"? "" : "아이디"} onChange={onChange} value={form.id}/>
                                
                { type === 'login' && <p className="logintitle">비밀번호</p>}
                <input autoComplete="new-password" name="password"  className={type === "login"? "box" : "registerbox"} placeholder={type === "login"? "" : "비밀번호"} type ="password" onChange={onChange} value={form.password}/>                    

                { type === 'register' && (
                    <>
                        <input autoComplete="new-password" name="password2"  className="registerbox" placeholder="비밀번호확인" type ="password" onChange={onChange} value={form.password2}/>

                        <input autoComplete="username" name="username" className="registerbox" placeholder ="닉네임" onChange={onChange} value={form.nickname}/>

                        <input autoComplete="email" name="email" className="registerbox" placeholder ="이메일" type="email" onChange={onChange} value={form.email}/>
                    </>
                )}
                <button className="btn1">{text}</button>
                {type === 'login' ? (
                    <Link to = '/register'>
                        <button className="btn2">회원가입</button>
                    </Link>
                    
                        
                ):(
                    <Link to = '/'>
                        <button className="btn2">취소</button>
                    </Link>
                    
                )}
            </form>
        </div>
    );
}

export default AuthForm;