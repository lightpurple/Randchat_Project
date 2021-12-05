import React from "react";

const ChatLog = (props) => {
    const { sysmsg} = props
    // const [msgList, setMsgList] = useState([]);

    // useEffect(() => {
    //     // messsgeItem : {msg: String, name: String, timeStamp: String}
    //     socket.on("message", (message) => {
    //     setMsgList((msgList) => [...msgList, message]);
    //     console.log(message);
    //     });

    //     socket.on("sysMsg", (message) => {
    //      setMsgList((msgList) => [...msgList, { msg: message }]);
    //     });

    //     socket.on("sysMsg", (message) => {
    //     setMsgList((msgList) => [...msgList, { msg: message }]);
    //     });

    //     return () => {
    //         socket.disconnect();
    //     };
        
    // }, [socket]);

    return (
        <div>
            {/* {msgList.map((data, idx) => (
                <div key={idx}>
                    <div>{data.massage}</div>
                </div>
            ))} */}
            <p>{sysmsg}</p>
        </div>
    );
};

export default ChatLog;