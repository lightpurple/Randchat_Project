import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './CSS/Header.css';

const Header = () => {
    const [auth, setAuth] = useState('')

    useEffect(() => {
      if (localStorage.getItem('token') !== null) {
        setAuth(true)
      }
    }, [])
  
    // fetch to axios 수정 
    const handleLogout = () => {
      let token = localStorage.getItem('token')
  
      Axios.post('/api/v1/mall/auth/logout/', token)
        .then(res => {
          localStorage.clear()
          // 사용하려면 App.js에서 /로 라우팅해야 한다
          window.location.replace('/')
        });
    }
    return(
        <header>
            <div className="TheTop">
                <div className="TopTitle">
                    Funny Chatter
                </div>

                <div className="TopBtn">
                    <a className="headermenu" href="/" onClick={handleLogout}>Logout</a>
                    <a className="headermenu" href="/My">My</a>
                    <a className="headermenu" href="/About">About</a>
                </div>
            </div>
        </header>
    );
}

export default Header;