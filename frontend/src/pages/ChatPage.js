import React from 'react';
import ChatForm from '../containers/Chat/ChatForm';
import ChatTitle from '../components/Chat/ChatTitle';
import { withRouter, useLocation } from 'react-router-dom';

const ChatPage = () => {
    const location = useLocation();
    const info = location.state
    const socket = location.socket
    return(
        <div>
            <ChatTitle title="가볍게 상대방과 하는 채팅"></ChatTitle>
            <ChatForm info={info} socket={socket}/>
        </div>
    );
}

export default withRouter(ChatPage);