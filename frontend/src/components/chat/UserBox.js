
import React, { useEffect, useState } from 'react';
import client from '../../lib/api/client';
import './CSS/UserBox.css';

const UserBox = () =>{
    const [chattername, setChattername] = useState(null);
    const [chatterintro, setChatterintro] = useState("");
    
        client.get('/chatting/').then((res)=>{
            setChattername(res.data.nickname);
            setChatterintro(res.data.introduce)
        })
    
    return (
        <div className="userbox">
            <img src="https://image.flaticon.com/icons/png/512/1946/1946429.png" className="icon" alt="profile"/>
            <p className="name">{chattername}</p>
            <p className="intro">{chatterintro}</p>
        </div>
    );
}

export default UserBox;