import React, { useEffect, useRef, useState } from 'react';
import './CSS/ChatPage.css';

const ChatForm = (props) =>{
    const {userList}=props
    return(
        <div className="ChatBox">
            <div className="ChatRoom">
                {/* <OtherChat/>
                <MyChat/> */}
            </div>

            <div className="FieldBox">
                <input className="message" placeholder="메세지를 입력하세요"/>    
                <button className="FieldButton">전송</button>
            </div>
            
            <div className='UserList'>
                {userList?(
                    <div>
                        {userList.map(user => (
                            <UserList user={user} key={user.id}/>
                        ))}
                    </div>
                ):(null)}
            </div>
            
        </div>
    );
}

const UserList = ({ user })=>{
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
                        }}>나가기</button>
                    </div>
                ):(
                    <div id="user1" className="YourName" style={{backgroundcolor: "rgb(80, 80, 80)"}}>
                        <h4>{user.other}</h4>
                        <p></p>

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