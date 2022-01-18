import ChatBox from '../components/chat/ChatBox';
import Title from '../components/Login/Title';
import { Link } from 'react-router-dom';

function Chatting() {

    return (
    <div className="Chatting">
        <Title title="가볍게 상대방과 하는 채팅"></Title>
        <Link to="/main" className='mnbutton'>메인페이지</Link>
        <ChatBox/>
    </div>
    );
  }
  
  export default Chatting;
  