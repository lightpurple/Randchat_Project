import React from 'react';
import ChatForm from '../containers/Chat/ChatForm';
import ChatTitle from '../components/Chat/ChatTitle';
import { useLocation, useHistory } from 'react-router-dom';

const ChatPage = () => {
    const location = useLocation();
    const history = useHistory();
    const info = location.state
    const socket = location.socket
    if(location.socket === undefined){
        history.push("/main");
    }

    return(
        <div>
            <ChatTitle title="가볍게 상대방과 하는 채팅"></ChatTitle>
            <ChatForm info={info} socket={socket}/>
        </div>
    );
}

export default React.memo(ChatPage);
