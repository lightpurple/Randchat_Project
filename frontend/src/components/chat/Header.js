import React from "react";
import { Link } from "react-router-dom";
import './CSS/Header.css';

const Header = () => {
    return(
        <div className="headerback">
            <div className="TopTitle">
                Funny Chatter
            </div>

            <div className="TopBtn">
                <Link to="/" className="headermenu">Logout</Link>
                <Link to="/mypage" className="headermenu">My</Link>
                <Link to="/about" className="headermenu">About</Link>
            </div>
        </div>
    );
}

export default Header;