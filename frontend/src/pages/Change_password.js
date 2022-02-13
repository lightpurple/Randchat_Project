import React from 'react';
import MyTitle from '../components/Mypage/MyTitle';
import ChangePW from '../components/Mypage/ChangePW';

function Change_password() {

    return (
        <div className="Mypage">
            <MyTitle title="가볍게 상대방과 하는 채팅"></MyTitle>
            <ChangePW/>
        </div>
    );
}

export default Change_password;