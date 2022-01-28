import React, { useEffect, useRef, useState } from 'react';
import './CSS/ChatForm.css';
import UserBox from './UserBox';
import Loader from "./Loader";
import Matchgender from '../../containers/chat/Matchgender';

const ChatForm = (props) =>{
    const { socket, user, gender, other, roomId, disconnect, findChat, cancel, loading, introduce, data} = props

    const [visible, setVisible] = useState(false);
    const [sysmsg, setSysMsg] = useState("") // 서비스 메세지
    const [chatMsg, setChatMsg] = useState(""); // 메시지 
    const [msgList, setMsgList] = useState([])



    const submit = (e) =>{
        e.preventDefault();
        var content = chatMsg
        
        if(!content){
            alert("대화내용을 입력해주세요");
            e.preventDefault()
            return;
        }
        console.log(content)
        
        setMsgList((msgList) => [...msgList, [content, user]]);
        // socket.emit("message",{roomId: roomId, message:content, nick: user});
        setChatMsg("");
    }

    const onChatMsgChange = (e) =>{
        setChatMsg(e.target.value);
    }

    // useEffect(()=>{
    //     socket.on("message",function(data){
    //         setMsgList((msgList) => [...msgList, [ data.message, data.nick]]);
    //         console.log(data);
    //     })
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[socket])

    // useEffect(()=>{
    //     socket.on("sysMsg", (data)=>{
    //         setSysMsg(data.message)
    //         console.log(data)
    //     })
    // },[socket])

    
    
    // const report = (e) =>{
    //     e.preventDefault();
    // }
    // const blocking = (e) =>{
    //     e.preventDefault();
    // }
    
    const ban = () =>{
        socket.emit("ban",{roomId : roomId, user : user, other: other})
        socket.on("banComplete",(result)=>{
            alert(result)
            console.log(result)
        })
        socket.emit("disconnect")
    }
    

    // 스크롤바 자동 이동
    const scrollRef = useRef(null);
    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    }

   useEffect(()=>{
        scrollToBottom()
    },[msgList])


    return(
        <div className="chatback">
            <div className="chatbox">
                <div className="chatboxtitle">
                    Chat
                </div>
                    
                <div className="chat">
                    <UserBox other={other} introduce={introduce}/>
                    <div className="chatLog">
                        {roomId ? (     
                            <div className="chatlog">
                                <div><p className="enter">{other}님이 입장했습니다.</p></div>
                                <p className="enter">{sysmsg}</p>

                                {msgList.map((data, idx)=>(
                                    <div key={idx} >
                                        { data[1] === user ?(
                                            <div className="me" ref={scrollRef}> 
                                                <p id="mynick">{data[1]}</p>
                                                <br></br>
                                                <p id="myChat">{data[0]}</p>
                                            </div>
                                        ):(
                                            <div className="other" ref={scrollRef}>
                                                <p id="othernick">{data[1]}</p>
                                                <br></br>
                                                <p id="otherChat">{data[0]}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div />
      
                            
                            </div>
                            ):(
                            <div>
                                <p className="enter">{sysmsg}</p>
                                <Loader></Loader>
                            </div>
                        )} 
                    </div>

                    {visible && 
                        <div className="menubox" >
                            <button className="menubtn" type="button" onClick={ban}>차단하기</button>
                            <button className="menubtn" type="button" 
                            onClick={()=> {disconnect() 
                            setMsgList([])
                            // setSysMsg("")
                        }}>나가기</button>
                        </div>
                    }
                </div>

                <div className="inputbox">
                    <form className="chatinput">
                        <input 
                            placeholder="Press Enter for send message."
                            value={chatMsg}
                            onChange={onChatMsgChange}
                        ></input>
                        <button className="inputbtn" onClick={submit}>전송</button>  
                    </form>
                    <button className="check-btn" onClick={() => setVisible(!visible)}>메뉴</button>
                </div>      
                        
            </div>
            <div className="roombox">

                <div className="boxtitle">
                    Room
                </div>

                <div className="Roomlist">
                    <button to='/chat' className="Plus">+</button>
                    {roomId ? null : (
                        <Matchgender 
                            socket={socket} 
                            user={user}
                            gender={gender}
                            data={data}
                            roomId={roomId}
                            
                            findChat={findChat}
                            cancel={cancel}
                            loading={loading}
                        
                        ></Matchgender>
                    )}  
                </div>              

            </div>
        </div>
    );
}

export default ChatForm;