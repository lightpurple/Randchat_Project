import React from 'react';
import Title from '../components/Auth/Title';
import ChangePW from '../components/Mypage/ChangePW';

function Change_password() {

    return (
        <div className="Mypage">
            <Title title="가볍게 상대방과 하는 채팅"></Title>
            <ChangePW/>
        </div>
    );
}

export default Change_password;