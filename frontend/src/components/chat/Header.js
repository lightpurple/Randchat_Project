import React from "react";
import { Link } from "react-router-dom";
import './CSS/Header.css';

const Header = ({ user, onLogout, ...rest}) => {

    return(
        <div className="headerback">
            <div className="TopTitle">
                Funny Chatter
            </div>

            {/* {user && (
                <div className="TopBtn">
                    <Link to="/" className="headermenu" onClick={onLogout}>Logout</Link>
                    <Link to="/mypage" className="headermenu">{user.nickname}</Link>
                    <Link to="/about" className="headermenu">About</Link>
                </div>
            )} */}

                <div className="TopBtn">
                    <Link to="/" {...rest} className="headermenu" onClick={onLogout}>Logout</Link>
                    <Link to="/mypage" className="headermenu">username</Link>
                    <Link to="/about" className="headermenu">About</Link>
                </div>
        </div>
    );
}

export default Header;