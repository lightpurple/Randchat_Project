import MainTitle from '../components/Main/MainTitle';
import MainForm from '../containers/main/MainForm';

function Mainpage() {

    return (
    <div className="Mainpage">
        <MainTitle title="가볍게 상대방과 하는 채팅"></MainTitle>
        <MainForm/>
    </div>
    );
  }
//   채팅은 매칭 후 들어갈 수 있으니 빼고 마이페이지/로그아웃만 두기
  
  export default Mainpage;
  