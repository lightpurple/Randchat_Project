import React from 'react';

import ChatForm from '../containers/chat/ChatForm';
import Title from '../components/Login/Title';

const ChatPage = ({location}) => {
    return(
        <div>
            <Title title="가볍게 상대방과 하는 채팅"></Title>
            <ChatForm props={location}/>
        </div>
    );
}

export default ChatPage;