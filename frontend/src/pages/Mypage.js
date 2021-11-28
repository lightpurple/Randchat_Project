import Title from '../components/Login/Title';
import Profile from '../components/Mypage/Profile';
import EmailPassword from '../components/Mypage/EmailPassword'
//import Gender from '../components/Mypage/Gender';
import Nickname from '../components/Mypage/Nickname';
import UserDelete from '../components/Mypage/UserDelete';
import Changepage from '../components/Mypage/Changepage';
import React from 'react';

function Mypage() {

  return (
    <div className="Mypage">
      <Title title="Funny Chatter"></Title>
      <UserDelete/>
      <Profile/>
      <EmailPassword/>
      <Nickname/>
      <Changepage/>
    </div>
  );
}

export default Mypage;
