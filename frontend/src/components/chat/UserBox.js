
import React from 'react';
import client from '../../lib/api/client';
import './CSS/UserBox.css';

const UserBox = () =>{
    client.get('/chatting/').then((res, req)=>{
        console.log(req);
        console.log(res);
        var username = res.nickname;
        var intro = res.introduce;
        localStorage.setItem("username", username)
        localStorage.setItem("introduce", intro)
    })
    return (
        <div className="userbox">
            <img src="https://image.flaticon.com/icons/png/512/1946/1946429.png" className="icon" alt="profile"/>
            <p className="name">{localStorage.getItem("username")}</p>
            <p className="intro">{localStorage.getItem("introduce")}</p>
        </div>
    );
}

export default UserBox;