import React from 'react';
import "./CSS/Mainpage.css";

function ChatList() {
    return(
    <div className="MainpageBox">
        <div className="ProfileImg">
            <div className="Img1"></div>
            <div className="Img2"></div>
            <div className="Img3"></div>
        </div>
        <div className='Match'>
            <p>상대방을 선택하여 대화를 시작해보세요</p>
            <button>Male</button>
            <button>Female</button>
        </div>
        <div className="ProfileImg">
            <div className="Img3"></div>
            <div className="Img1"></div>
            <div className="Img2"></div>
        </div>
    </div>
    )
}
export default ChatList;