import React, { useEffect, useState } from 'react';
import UserBox from './UserBox';
import './CSS/ChatBox.css';

import socketIOClient from "socket.io-client";
import ChatLog from './ChatLog';
import Loading from "./Loading";


// const socket = socketio.connect('http://localhost:3000')


const ChatBox = ({ roomName, userName, socket }) =>{
    const [visible, setVisible] = useState(false);
    const myInfo = {
        roomName: roomName ? roomName : localStorage.getItem("roomName"),
        userName: userName ? userName : localStorage.getItem("userName"),
    };
    const [chatMessage, setChatMessage] = useState("");
    const [currentSocket, setCurrentSocket] = useState();
    
    useEffect(() => {
        // setCurrentSocket(socketIOClient("")); 소캣 주소넣기
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("onSend", {
            userName: userName ? userName : localStorage.getItem("userName"),
            msg: chatMessage,
            timeStamp: new Date().toLocaleTimeString(),
        });
        setChatMessage("");
    };
    const close = (e) => {
        e.preventDefault();
        socket.leave();
    }
    
    const onChatMessageChange = (e) => {
        setChatMessage(e.target.value);
    };


    if (currentSocket) {
        currentSocket.on("connect", () => {
            currentSocket.emit("join", myInfo);
        });
    }
    
    return(
        <div className="chatbox">
            <div className="chatboxtitle">
                <h3>Chat</h3>
            </div>
                   
            <div className="chat">
                <UserBox nickname={userName} intro="Hi, I'm nickname"></UserBox>
                {currentSocket ? (     
                    <ChatLog socket={currentSocket}/>
                    ):(
                    <Loading></Loading>
                )} 

                {visible && 
                    <div className="menubox" >
                        <button className="menubtn">신고하기</button>
                        <button className="menubtn">차단하기</button>
                        <button className="menubtn" onClick={close}>나가기</button>
                    </div>
                }
            </div>

            <div className="inputbox" onSubmit={handleSubmit}>
                <input placeholder="Press Enter for send message." 
                        value={chatMessage}
                        onChange={onChatMessageChange}></input>
                <button className="inputbtn">입력</button>
                <button className="check-btn" onClick={() => setVisible(!visible)}>메뉴</button>   
            </div>      
                       
        </div>
    );
}

export default ChatBox;