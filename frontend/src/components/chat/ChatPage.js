import React, { useState } from 'react';
import './CSS/ChatPage.css';
import { RiSendPlaneFill } from 'react-icons/ri';

const ChatForm = (props) =>{
    const {socket, userList, other, otherIntro, onListRemove, sysMsg, onChatChange, onChatSubmit, message}=props

    return(
        <div className="ChatBox">
            <div className="ChatRoom">
                <div className='ChatM'>
                <p>{sysMsg}</p>
                <p>{other}이 입장했습니다</p>
                </div>
                <OtherChat/>
                <MyChat/>
            </div>

            <div className="FieldBox">
                <input 
                    className="message" 
                    name="message" 
                    placeholder="메세지를 입력하세요"
                    onChange={onChatChange}
                    value={message}
                />    
                <button className="FieldButton" onClick={onChatSubmit}><RiSendPlaneFill size='28' className='Send'/></button>
            </div>
            
            <div className='UserList'>
                {userList?(
                    <div>
                        {userList.map(user => (
                            <UserList user={user} key={user.id} otherIntro={otherIntro} onListRemove={onListRemove} socket={socket}/>
                        ))}
                    </div>
                ):(null)}
                <UserList user={"user1"} key={12} otherIntro={"안녕하세요"} onListRemove={onListRemove}/>
            </div>
            
        </div>
    );
}

const UserList = ({ user,otherIntro,onListRemove,socket })=>{
    const [visible, setVisible] = useState(false);
    return(
        <div className="User">

            <img  src="https://image.flaticon.com/icons/png/512/1946/1946429.png" className="YourProfile" alt="profile" onClick={()=>{setVisible(!visible)}}/>

            {visible ?
                (
                    <div className="YourName">
                        <button className="blk" 
                            onClick={()=>{
                            console.log("차단")
                        }}>Block</button>
                        <button className="exit"  onClick={()=>{
                            console.log("나가기")
                            onListRemove(user.id)
                            socket.disconnect()
                        }}>Exit</button>
                    </div>
                ):(
                    <div id="user1" className="YourNameBG" style={{backgroundcolor: "#D4D4D4"}}>
                        <h4>{user.other}</h4>
                        {otherIntro? <p>{otherIntro}</p> :<p>안녕하세요. {user.other}입니다.</p>}

                    </div>
                )
            }
        </div>
    )
}

const OtherChat = () =>{
    return(
        <div className="YourChatbox">
            <div className="YourImg"></div>
            <div className="YourChat"></div>
        </div>
    )
}

const MyChat = () =>{
    return(
        <div className="MyChatbox">
            <div className="MyChat"></div>
            <div className="MyImg"></div>
        </div>
    )
}
export default ChatForm;