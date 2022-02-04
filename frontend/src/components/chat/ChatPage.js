import React, { useEffect, useRef, useState } from 'react';
import './CSS/ChatPage.css';

const ChatForm = (props) =>{
    const {userList, user, other, otherIntro, roomId, onListRemove, sysMsg, onChatChange, onChatSubmit, message}=props

    return(
        <div className="ChatBox">
            <div className="ChatRoom">
                {sysMsg?<p>{sysMsg}</p>:null}
                <p>{other}이 입장했습니다</p>
                {/* <OtherChat/>
                <MyChat/> */}
            </div>

            <div className="FieldBox">
                <input 
                    className="message" 
                    name="message" 
                    placeholder="메세지를 입력하세요"
                    onChange={onChatChange}
                    value={message}
                />    
                <button className="FieldButton" onClick={onChatSubmit}>전송</button>
            </div>
            
            <div className='UserList'>
                {userList?(
                    <div>
                        {userList.map(user => (
                            <UserList user={user} key={user.id} otherIntro={otherIntro} onListRemove={onListRemove}/>
                        ))}
                    </div>
                ):(null)}
                <UserList user={"user1"} key={12} otherIntro={"안녕하세요"} onListRemove={onListRemove}/>
            </div>
            
        </div>
    );
}

const UserList = ({ user,otherIntro,onListRemove })=>{
    const [visible, setVisible] = useState(false);
    return(
        <div className="User">

            <img  src="https://image.flaticon.com/icons/png/512/1946/1946429.png" className="YourProfile" alt="profile" onClick={()=>{setVisible(!visible)}}/>

            {visible ?
                (
                    <div className="YourName" style={{backgroundcolor: "rgb(0, 255, 255)"}}>
                        <button className="blk" 
                            onClick={()=>{
                            console.log("차단")
                        }}>차단</button>
                        <button className="exit"  onClick={()=>{
                            console.log("나가기")
                            onListRemove()
                        }}>나가기</button>
                    </div>
                ):(
                    <div id="user1" className="YourName" style={{backgroundcolor: "rgb(80, 80, 80)"}}>
                        <h4>{user.other}</h4>
                        {otherIntro? <p>{otherIntro}</p> :<p>안녕하세요. {user.other}입니다.</p>}

                    </div>
                )
            }
                    {/* div → p요소로 이름 나타내기 */}
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