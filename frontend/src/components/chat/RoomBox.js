import React from 'react';
import { Link } from "react-router-dom";
import './CSS/RoomBox.css';

const RoomBox = ({ userName, roomName, setUserName, setRoomName }) =>{

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };
    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };
    
    localStorage.setItem("userName", userName);
    localStorage.setItem("roomName", roomName);
    return (
        <div className="roombox">

            <div className="boxtitle">
                <h3>Room</h3>
            </div>

            <label htmlFor="roomName">Room</label>
            <input name="roomName" onChange={handleRoomNameChange}></input>
            <label htmlFor="id">ID</label>
            <input name="id" onChange={handleUserNameChange}></input>

            <div className="Roomlist">
                <button className="Plus">
                    <Link to="/Chat">+</Link>
                </button>
            </div>              

        </div>

    );
}

export default RoomBox;