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
                
                { type === 'login' && <p className="logintitle">이메일</p>}
                <input autoComplete="email" name="email" className={type === "login"? "box" : "registerbox"} placeholder={type === "login"? "" : "이메일"}  type="email" onChange={onChange} value={form.email}
                />
                                
                { type === 'login' && <p className="logintitle">비밀번호</p>}
                <input autoComplete="new-password" name="password"  className={type === "login"? "box" : "registerbox"} placeholder={type === "login"? "" : "비밀번호"} type ="password" onChange={onChange} value={form.password} minLength="8" pattern="[A-Za-z]/[^0-9]/g"/>
                {form.password.length > 0 && form.password.length < 8  && <div style={{color : 'red'}}>영어, 숫자를 포함한 8자 이상 입력해주세요.</div>}                  

                { type === 'register' && (
                    <>
                        <input autoComplete="new-password" name="password2"  className="registerbox" placeholder="비밀번호확인" type ="password" onChange={onChange} value={form.password2}/>
                        {form.password !== form.password2 && <div style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>}
                        

                        <input autoComplete="nickname" name="nickname" className="registerbox" placeholder ="닉네임" onChange={onChange} value={form.nickname}/>

                        {/* <label for="gender">남자</label>
                        <input type="radio" name="gender" value={form.gender} checked={form.gender="man"} onClick={form.gender==="man"}/>

                        <label for="gender">여자</label>
                        <input type="radio" name="gender" value={form.gender} checked={form.gender="woman"} onClick={form.gender==="woman"}/> */}
                    </>
                )}
                <button className="btn1">{text}</button>
                {type === 'login' ? (
                    <Link to = '/signup'>
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