import React, { useEffect, useRef, useState } from 'react';
import './CSS/ChatPage.css';
import { RiSendPlaneFill } from 'react-icons/ri';

const ChatForm = (props) =>{
    const {socket, user, userList, other, onListRemove, sysMsg, onChatChange, onChatSubmit, message, ban,chatMsgList, image}=props

    const messagesEndRef = useRef(null);
    
    const scrollToBottom = ()=>{
        messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: 'end', inline: 'nearest' })
    }
    useEffect(scrollToBottom, [chatMsgList]);
    return(
        <div className="ChatBox">
            <div className="ChatRoom" >
                <div className='ChatM'>
                    <p>{other}이 입장했습니다</p>
                </div>
                {chatMsgList?(
                    <div ref={messagesEndRef}>
                        {chatMsgList.map((msg, index)=>(
                            <div key={index}>
                                {msg.nick===user? 
                                    <MyChat  msg={msg} />
                                    :<OtherChat msg={msg} image={image} />
                                }
                            </div>
                        ))}
                    </div>
                ):(null)}
                <p>{sysMsg}</p>
            </div>

            <div className="FieldBox">
                <input 
                    className="message" 
                    name="message" 
                    placeholder="메세지를 입력하세요"
                    onChange={onChatChange}
                    value={message}
                    maxLength='30'
                />    
                <button className="FieldButton" onClick={onChatSubmit}><RiSendPlaneFill size='28' className='Send'/></button>
            </div>
            
            <div className='UserList'>
                {userList?(
                    <div>
                        {userList.map(user => (
                            <UserList user={user} key={user.id} onListRemove={onListRemove} socket={socket} ban={ban}/>
                        ))}
                    </div>
                ):(null)}
            </div>
            
        </div>
    );
}

const UserList = ({ user,onListRemove,socket,ban })=>{
    const [visible, setVisible] = useState(false);
    return(
        <div className="User">
            
            <img  src={(user.image)? user.image :process.env.PUBLIC_URL+'/1946429.png'} className="YourProfile" alt="profile" onClick={()=>{setVisible(!visible)}}/>
            
            {visible ?
                (
                    <div className="YourName">
                        <h4>{user.other}</h4>
                        <button className="blk" 
                            onClick={()=>{
                            ban()
                            onListRemove(user.id)
                        }}>Block</button>
                        <button className="exit"  onClick={()=>{
                            onListRemove(user.id)
                            socket.disconnect()
                            window.location.href='/main'
                        }}>Exit</button>
                    </div>
                ):(
                    <div id="user1" className="YourNameBG" style={{backgroundcolor: "#D4D4D4"}}>
                        <h4>{user.other}</h4>
                        {user.otherIntro? <p>{user.otherIntro}</p> :<p>안녕하세요. {user.other}입니다.</p>}

                    </div>
                )
            }
        </div>
    )
}

const OtherChat = ({msg, image}) =>{
    return(
        <div className="YourChatbox">
            <img  src={(image)? image :process.env.PUBLIC_URL+'/1946429.png'} className="YourImg" alt="profile"/>
            <div className="YourChat">{msg.message}</div>
        </div>
    )
}

const MyChat = ({msg}) =>{
    return(
        <div className="MyChatbox">
            <div className="MyChat">{msg.message}</div>
        </div>
    )
}
export default ChatForm;