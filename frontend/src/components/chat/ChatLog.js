import React from "react";
import './CSS/ChatLog.css'

const ChatLog = (props) => {
    const { sysmsg, other, socket, user } = props
    socket.on("message", function(data){
        // $("#chat").append(data.message);
    })

// $("#sendMessage").on("click",function(){
    //     var content = $("#content").val();
    //     if(!content){
    //         alert("대화내용을 입력해주세요");
    //         return ;
    //     }
    //     var str = "";
    //     str += "<li>";
    //     str += "<strong>"+nick+"</strong>";
    //     str += "<p>"+content+"</p>";
    //     str += "<hr>";
    //     str += "</li>";

    //     socket.emit("message",{roomId:roomName, message:str});
    //     $("#content").val("");
    //     $("#chat").scrollTop($("#chat")[0].scrollHeight);
    //     $("#chat").append(str);
    // });
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
        <div className="chatlog">
            <div><p className="enter">{other}님이 입장했습니다.</p></div>
            <div><p className="enter">{sysmsg}</p></div>
            <div>
                <div className="other">
                    <p id="othernick">other</p>
                    <br></br>
                    <p id="otherChat">다른사람이야</p>
                </div>

                <div className="me"> 
                    <p id="mynick">{user}</p>
                    <br></br>
                    <p id="myChat">me야</p>
                </div>
            </div>
            {/* {msgList.map((data, idx) => (
                <div key={idx}>
                    <div>{data.massage}</div>
                </div>
            ))} */}
            {/* <p>{sysmsg}</p> */}
            
        </div>
    );
};

export default ChatLog;