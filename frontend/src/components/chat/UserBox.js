import React from 'react';
import './CSS/UserBox.css';

const UserBox = () =>{
    return (
        <div className="userbox">
            {/* <img 
                src="https://image.flaticon.com/icons/png/512/1946/1946429.png"
                className="usericon"/> */}
            <a className="username">User Name</a>
        </div>
    );
}

export default UserBox;