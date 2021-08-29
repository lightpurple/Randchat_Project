import React from 'react';
import ChatBox from './ChatBox';
import './CSS/ChatForm.css';
import RoomBox from './RoomBox';

const ChatForm = () =>{
    return(
        <div className="chatback">
            <ChatBox/>
            <RoomBox/>
        </div>
    );
}

export default ChatForm;