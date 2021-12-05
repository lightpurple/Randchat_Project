
import React from 'react';
import './CSS/UserBox.css';

const UserBox = (props) =>{
    const {other, introduce} = props

    return (
        <div className="userbox">
            <img src="https://image.flaticon.com/icons/png/512/1946/1946429.png" className="icon" alt="profile"/>
            {/* <p className="name">{chattername}</p> */}
            <p className="name">{other}</p>
            <p className="intro">{introduce}</p>
        </div>
    );
}

export default UserBox;