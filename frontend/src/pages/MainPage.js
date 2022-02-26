import React from 'react';
import MainTitle from '../components/Main/MainTitle';
import MainForm from '../containers/Main/MainForm';

function Mainpage() {

  return (
    <div className="Mainpage">
      
      <MainTitle title="가볍게 상대방과 하는 채팅"></MainTitle>
        <MainForm/>
    </div>
  );
}
  
export default Mainpage;
  