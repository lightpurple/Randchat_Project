import React from "react";

const chatback = {
    position:"fixed",
    left:"0",
    top:"0",
    bottom:"0",
    right:"0",
    background : "#ffffff"
};

const ChatBlock = ({children, ...props}) => {
    return <div {...props} style={chatback}>{children}</div>
}

export default ChatBlock;
