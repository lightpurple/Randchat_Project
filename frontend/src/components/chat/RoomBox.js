import React from 'react';
import './CSS/RoomBox.css';

const RoomBox = () =>{
    return (
        <div className="userbox">
            <div id="roombox">

                <div id="boxtitle">
                    <h3>Room</h3>
                </div>

                <div id="Roomlist">
                    <button id="Plus">+</button>
                </div>              

            </div>
        </div>
    );
}

export default RoomBox;