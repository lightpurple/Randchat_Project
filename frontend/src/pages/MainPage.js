import Title from '../components/Login/Title';
import ChatList from '../components/Mainpage/ChatList';

function Mainpage() {

    return (
    <div className="Mainpage">
        <Title title="가볍게 상대방과 하는 채팅"></Title>
        <ChatList/>
    </div>
    );
  }
  
  export default Mainpage;
  