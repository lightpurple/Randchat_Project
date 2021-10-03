import React, { useState } from "react";
import { Link } from "react-router-dom";
import client from "../lib/api/client";
import './Header.css';

const Header = ({ ...rest}) => {
    const [user, setUser] = useState(null);
    
    client.get('/chatting/').then((res)=>{
        console.log(res.data);
        console.log("토큰" + localStorage.getItem('token'));
        setUser(res.data.nickname);
    })
    
    return(
        <div className="headerback">
            <div className="TopTitle">
                Funny Chatter
            </div>
                <div className="TopBtn">
                    <Link to="/" className="headermenu" onClick={localStorage.clear()}>Logout</Link>
                    <Link to="/mypage" className="headermenu">{user}</Link>
                    <Link to="/about" className="headermenu">About</Link>
                </div>
            
        </div>
    );
}

export default Header;