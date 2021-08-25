import React, { Component } from 'react';
import './CSS/Footer.css';

class Footer extends Component{
    render() {
        return(
            <footer>
                <ul id="footermenu">
                    <li>
                        <a className="footermenu" ref="/About">About</a>
                        <a className="footermenu" href="#">개인정보 보호</a>
                        <a className="footermenu" href="#">도움말</a>
                        <a className="footermenu" href="#">공지사항</a>
                        <a className="footermenu" href="#">문의하기</a>
                    </li>
                </ul>
            </footer>
        );

    }
}

export default Footer;