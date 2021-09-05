import React from 'react';
import './CSS/RoomBox.css';

const RoomBox = () =>{
    return (
        <div className="roombox">

            <div className="boxtitle">
                <h3>Room</h3>
            </div>

            <div className="Roomlist">
                <button className="Plus">+</button>
            </div>              

        </div>

    );
}

export default RoomBox;