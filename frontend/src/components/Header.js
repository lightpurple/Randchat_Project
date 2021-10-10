import React, {  useState } from "react";
import { Link } from "react-router-dom";
import client from "../lib/api/client";
import './Header.css';

const Header = () => {
    // const [user, setUser] = useState(null);

    // client.get('/chatting/').then((res)=>{
    //     console.log("header : "+ res)
    //     setUser(res.data.nickname);
    // }) 

    const onLogout = () => {
        localStorage.clear();
    };
    
    return(
        <div className="headerback">
            <div className="TopTitle">
                Funny Chatter
            </div>
                <div className="TopBtn">
                    <Link to="/" className="headermenu" onClick={onLogout}>Logout</Link>
                    <Link to="/mypage" className="headermenu">mypage</Link>
                    <Link to="/about" className="headermenu">About</Link>
                </div>
            
        </div>
    );
}

export default Header;