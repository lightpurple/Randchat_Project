import React from "react";
import ChatForm from "../containers/chat/ChatForm";
import ChatTitle from "../components/chat/ChatTitle";

const ChatPage = ({ location }) => {
  return (
    <div>
      <ChatTitle title="가볍게 상대방과 하는 채팅"></ChatTitle>
      <ChatForm props={location} />
    </div>
  );
};

export default ChatPage;
