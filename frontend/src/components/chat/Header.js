import React from "react";
import { Link } from "react-router-dom";
import './CSS/Header.css';

const Header = ({ user, onLogout, ...rest}) => {
    // axios.get('/chatting'),{

    // }
    return(
        <div className="headerback">
            <div className="TopTitle">
                Funny Chatter
            </div>
                <div className="TopBtn">
                    <Link to="/" className="headermenu" onClick={localStorage.removeItem('token')}>Logout</Link>
                    <Link to="/mypage" className="headermenu">nickname</Link>
                    <Link to="/about" className="headermenu">About</Link>
                </div>
            
        </div>
    );
}

export default Header;