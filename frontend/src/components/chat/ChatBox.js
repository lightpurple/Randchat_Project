import React from "react";
import "./CSS/ChatBox.css";

function ChatBox() {
    return(
    <div className="ChatBox">
        <div className="ChatRoom">
        <div className="YourChatbox">
            <div className="YourImg"></div>
            <div className="YourChat"></div>
        </div>
        <div className="MyChatbox">
            <div className="MyChat"></div>
            <div className="MyImg"></div>
        </div>
        </div>
        <div className="FieldBox">
            <div className="Field"></div>
            <div className="FieldButton"></div>
        </div>
    </div>
    )
}
export default ChatBox;