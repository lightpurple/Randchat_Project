import React from "react";
import { Link } from "react-router-dom";
import client from "../lib/api/client";
import './Header.css';

const Header = ({ onLogout, ...rest}) => {
    client.get('/chatting/').then((res)=>{
        console.log(res.data);
        console.log("토큰" + localStorage.getItem('token'));
        console.log("닉네임" + res.data.nickname)
        localStorage.setItem('nickname', res.data.nickname)
        console.log(localStorage.getItem('nickname'));
    })
    return(
        <div className="headerback">
            <div className="TopTitle">
                Funny Chatter
            </div>
                <div className="TopBtn">
                    <Link to="/" className="headermenu" onClick={localStorage.clear()}>Logout</Link>
                    <Link to="/mypage" className="headermenu">{localStorage.getItem('nickname')}</Link>
                    <Link to="/about" className="headermenu">About</Link>
                    
                </div>
            
        </div>
    );
}

export default Header;