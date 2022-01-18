import Title from '../components/Login/Title';
import ChatList from '../components/Mainpage/ChatList';
import { Link } from 'react-router-dom';

function Mainpage() {

    return (
    <div className="Mainpage">
        <Title title="가볍게 상대방과 하는 채팅"></Title>
        <Link to="/chat" className='cbutton'>채팅</Link>
        <Link to="/chatting" className='ctbutton'>새 채팅</Link>
        <Link to="/mypage"  className='mbutton'>마이페이지</Link>
        <ChatList/>
    </div>
    );
  }
  
  export default Mainpage;
  