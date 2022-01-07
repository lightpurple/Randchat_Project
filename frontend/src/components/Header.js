import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
    const onLogout = () => {
        localStorage.clear();
    };
    
    return(
        <div className="headerback">
            <div className="TopTitle">
                가볍게 상대방과 하는 채팅
            </div>
                <div className="TopBtn">
                    <Link to="/mainpage" className="headermenu">mainpage</Link>
                    <Link to="/" className="headermenu" onClick={onLogout}>Logout</Link>
                    <Link to="/mypage" className="headermenu">mypage</Link>
                    <Link to="/about" className="headermenu">About</Link>
                </div>
            
        </div>
    );
}

export default Header;