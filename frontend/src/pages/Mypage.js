import MyTitle from '../components/Mypage/MyTitle';
import Profile from '../components/Mypage/Profile';
import EmailPassword from '../components/Mypage/EmailPassword'
//import Gender from '../components/Mypage/Gender';
import Nickname from '../components/Mypage/Nickname';
import UserDelete from '../components/Mypage/UserDelete';
import Changepage from '../components/Mypage/Changepage';


function Mypage() {

  return (
    <div className="Mypage">
      <MyTitle title="가볍게 상대방과 하는 채팅"></MyTitle>
      <Profile/>
      <EmailPassword/>
      <Nickname/>
      <Changepage/>
      <UserDelete/>
    </div>
  );
}

export default Mypage;
