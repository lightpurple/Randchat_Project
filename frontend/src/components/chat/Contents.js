import React, { Component } from 'react';
import ChatBox from './ChatBox';
import RoomBox from './RoomBox';
import './CSS/Contents.css';

class Contents extends Component {
    render() {
        return(
            <div id="content">
                <ChatBox></ChatBox>
                <RoomBox></RoomBox>
            </div>
        );
    }
}

export default Contents;