import React, { useState } from "react";
import "./CSS/ChatBox.css";
import List from './List'

const ChatBox = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const modalClose = () => {
        setModalOpen(!modalOpen)
        // Open()
    }

    // const [On, Off] = useState(false)
    // const Open = () => {
    //     Off(!On)
    //     const co = document.getElementById("blo");
    //     co.style.display = ("none" && "block");
    // }


    return(
    

    <div className="ChatBox">
        <div className="ChatRoom">
        <div className="YourChatbox">
            <div className="YourImg"></div>
            <div className="YourChat"></div>
        </div>
        <div className="MyChatbox">
            <div className="MyChat"></div>
            <div className="MyImg"></div>
        </div>
        </div>

        <div className="FieldBox">
            <div className="Field"><input className="message"/>
            </div>
            <div className="FieldButton"></div>
            <div className="UserList">
                <div className="User">
                    <button className="YourProfile" onClick={modalClose}></button>
                    <div id="user1" className="YourName"></div>
                    {modalOpen && <List modalClose={modalClose}></List>}
                    {/* div → p요소로 이름 나타내기 */}
                    </div>

                {/* 2번째 유저 - 1번째 유저와 모달 별개 수정 필요 */}
                <div className="User">
                    <button className="YourProfile" onClick={modalClose}></button>
                    <div id="user2" className="YourName"></div>
                    {modalOpen && <List modalClose={modalClose}></List>}
                </div>
            </div>
        </div>
        
    </div>
    )
}
export default ChatBox;