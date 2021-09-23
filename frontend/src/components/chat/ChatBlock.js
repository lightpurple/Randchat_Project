import React from "react";

const chatback = {
    position:"absolute",
    left:"0",
    top:"0",
    bottom:"0",
    right:"0",
    background : "#ffffff"
};

const ChatBlock = ({children, ...rest}) => {
    return <div {...rest} style={chatback}>{children}</div>
}

export default ChatBlock;
