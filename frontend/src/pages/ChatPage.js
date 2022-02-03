import React from 'react';
import ChatBlock from '../components/chat/ChatBlock';
import ChatPageForm from '../containers/chat/ChatPageForm';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ChatPage = () => {
    return(
        <ChatBlock>
            <Header/>
            <ChatPageForm/>
            <Footer/>
        </ChatBlock>
    );
}

export default ChatPage;