import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
    return(
        <div className="footerback">
            <ul className="footermenu">

                <Link to="/about" className="footermenu">Developer</Link>
                <Link to="#" className="footermenu">About</Link>
            </ul>
        </div>
    );
}

export default Footer;