import React from "react";
import { Link } from "react-router-dom";
import './CSS/Footer.css';

const Footer = () => {
    return(
        <div className="footerback">
            <ul className="footermenu">

                <Link to="/about" className="footermenu">About</Link>
                <Link to="#" className="footermenu">개인정보 보호</Link>
                <Link to="#" className="footermenu">도움말</Link>
                <Link to="#" className="footermenu">공지사항</Link>
                <Link to="#" className="footermenu">문의하기</Link>

            </ul>
        </div>
    );
}

export default Footer;