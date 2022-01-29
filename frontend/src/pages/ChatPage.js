import React from 'react';

import ChatForm from '../containers/chat/ChatForm';
import Title from '../components/Login/Title';
import { Link } from 'react-router-dom';

const ChatPage = ({location}) => {
    return(
        <div>
            <Title title="가볍게 상대방과 하는 채팅"></Title>
            <Link to="/main" className='mnbutton'>메인페이지</Link>
            <ChatForm props={location}/>
        </div>
    );
}

export default ChatPage;