import React from 'react';
import './CSS/UserBox.css';

const UserBox = () =>{
    return (
        <div className="userbox">
            <img src="https://image.flaticon.com/icons/png/512/1946/1946429.png" className="icon" alt="profile"/>
            <p className="name">User Name</p>
            <p className="intro">Hi, I'm User Name</p>
        </div>
    );
}

export default UserBox;