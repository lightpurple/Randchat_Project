import React from 'react';
import UserBox from './UserBox';
import './CSS/ChatBox.css';

const ChatBox = () =>{
    return(
        <div className="chatbox">
            <div className="chatboxtitle">
                <h3>Chat</h3>
            </div>
            
            <div className="chat">
                <UserBox></UserBox>
                
            </div>
            
            <div className="inputbox">
                {/* <Menus></Menus> */}
                <textarea placeholder="Press Enter for send message."></textarea>
                <button className="inputbtn">입력</button>
                <button className="check-btn" >메뉴</button>
            </div>                
        </div>
    );
}

export default ChatBox;