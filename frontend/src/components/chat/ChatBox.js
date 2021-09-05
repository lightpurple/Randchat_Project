import React, { useEffect, useState } from 'react';
import UserBox from './UserBox';
import './CSS/ChatBox.css';

// import socketio from 'socket.io-client';
// const socket = socketio.connect('http://localhost:3000')


const ChatBox = (props) =>{
    const [visible, setVisible] = useState(false);
    
    return(
        <div className="chatbox">
            <div className="chatboxtitle">
                <h3>Chat</h3>
            </div>
            
            <div className="chat">
                <UserBox></UserBox>
                {visible && 
                    <div className="menubox" >
                        <button className="menubtn">신고하기</button>
                        <button className="menubtn">차단하기</button>
                        <button className="menubtn">나가기</button>
                    </div>}
            </div>
            <div className="inputbox">
                <textarea placeholder="Press Enter for send message."></textarea>
                <button className="inputbtn">입력</button>
                <button className="check-btn" onClick={() => setVisible(!visible)}>메뉴</button>
            </div>                
        </div>
    );
}

export default ChatBox;


// 입력 양식 컴포넌트
// class ChatForm extends React.Component {
//     constructor(props){
//         super(props)
//         this.state = {name: "", message: ''}
//     }
//     nameChanged(e) {
//         this.setState({name: e.target.value})
//     }
//     messageChanged(e){
//         this.setState({message: e.target.value})
//     }

//     //서버에 이름과 메시지 전송

//     send(){
//         socket.emit('chat-msg',{
//             name:this.state.name,
//             message: this.state.message
//         })
//         this.setState({message: ''})//입력 양식을 비웁니다.
//     }
// }

// //채팅 애플리케이션의 메인 컴포넌트를 정의합니다.
// class ChatApp extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             logs:[]
//         }
//     }
// }