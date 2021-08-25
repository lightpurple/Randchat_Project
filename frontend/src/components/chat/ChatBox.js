import React, { Component } from 'react';
import './CSS/ChatBox.css';
import Menus from './Menus';
import UserBox from './UserBox';

class ChatBox extends Component{
    render(){
        return(
            <div id="chatbox">
                <div id="title">
                    <h3>Chat</h3>
                </div>
                <div id="chat">
                    <UserBox></UserBox>
                    
                </div>
                
                <div id="inputbox">
                    <Menus style="display: none"></Menus>
                    <textarea placeholder="Press Enter for send message."></textarea>
                    <button id="btn1">입력</button>
                    <button id="check-btn" >메뉴</button>
                </div>                
            </div>

        );
    }
}

export default ChatBox