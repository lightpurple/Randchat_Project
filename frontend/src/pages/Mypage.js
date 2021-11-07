import Title from '../components/Login/Title';
import Profile from '../components/Mypage/Profile';
import EmailPassword from '../components/Mypage/EmailPassword'
//import Gender from '../components/Mypage/Gender';
import Nickname from '../components/Mypage/Nickname';
import UserDelete from '../components/Mypage/UserDelete';
import ChatPage from '../components/Mypage/ChatPage';
import React from 'react';

function Mypage() {

  return (
    <div className="Mypage">
      <Title title="Funny Chatter"></Title>
      <UserDelete/>
      <Profile/>
      <EmailPassword/>
      <Nickname/>
      <ChatPage/>
      {/*<Gender/>*/}
    </div>
  );
}

export default Mypage;
