import React from 'react';
import ChatBlock from '../components/chat/ChatBlock';
import ChatForm from '../components/chat/ChatForm';
import Footer from '../components/chat/Footer';
import HeaderContainer from '../containers/chat/HeaderContainer';

const ChatPage = () => {
    return(
        <ChatBlock>
            <HeaderContainer/>
            <ChatForm/>
            <Footer/>
        </ChatBlock>
    );
}

export default ChatPage;