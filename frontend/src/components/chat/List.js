import React from 'react';
import "./CSS/ChatPage.css";

const List = ({modalClose}) => {
    return (
        <div className="modal__container">
            <button className="blk">차단</button>
            <button className="exit">나가기</button>
        </div>
    )
}

export default List