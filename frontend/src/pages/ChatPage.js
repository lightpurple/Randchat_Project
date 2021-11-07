import React from 'react';
import ChatBlock from '../components/chat/ChatBlock';
import ChatForm from '../components/chat/ChatForm';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ChatPage = () => {
    return(
        <ChatBlock>
            <Header/>
            <ChatForm/>
            <Footer/>
        </ChatBlock>
    );
}

export default ChatPage;