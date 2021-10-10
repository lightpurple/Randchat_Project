import React, { useEffect, useState } from "react";

const ChatLog = ({ socket }) => {
    const [msgList, setMsgList] = useState([]);

    useEffect(() => {
        // messsgeItem : {msg: String, name: String, timeStamp: String}
        socket.on("message", (message) => {
        setMsgList((msgList) => [...msgList, message]);
        console.log(message);
        });

        socket.on("sysMsg", (sysMsg) => {
        setMsgList((msgList) => [...msgList, { msg: sysMsg }]);
        });

        socket.on("sysMsg", (sysMsg) => {
        setMsgList((msgList) => [...msgList, { msg: sysMsg }]);
        });

        return () => {
            socket.disconnect();
        };
        
    }, [socket]);

    return (
        <div>
            {msgList.map((msg, idx) => (
                <div key={idx}>
                    <div>{msg.msg}</div>
                </div>
            ))}
        </div>
    );
};

export default ChatLog;