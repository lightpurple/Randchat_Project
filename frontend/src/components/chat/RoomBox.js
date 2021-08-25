import React, { Component } from 'react';
import './CSS/RoomBox.css'

class RoomBox extends Component{
    render(){
        return(
            <div id="roombox">

                <div id="boxtitle">
                    <h3>Room</h3>
                </div>

                <div id="Roomlist">
                    <button id="Plus">+</button>
                </div>              

            </div>
        );
    }
}

export default RoomBox;