import React, {useState} from 'react';
import NickModal from './NickModal';
import axios from 'axios';


function Nick() {
    const [ modalOpen, setModalOpen ] = useState(false);
  
    const openModal = () => {
        setModalOpen(true);
    }
    const changeModal = () => {
        console.log(text);

    axios.patch('http://localhost:3001/nickname/1', {nickname: text})
    .catch(error => {
        console.error('Error!', error);
    });
    
       //404 오류. put 방법 찾기. put 하고 페이지 새로고침 => DB 변경에 따라 마이페이지 닉네임 변경
       //username만 수정되는 게 아니라 전체가 변경됨 > password, username 동시변경 안됨
       //방법 찾아서 두 개 동시에 바꾸고 새로고침 넣기
       //=>put 전체 수정, patch 일부 수정
        
        setModalOpen(false);
        window.location.reload();
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const [text, setText] = useState("");
    // 하단 input 박스에서 값 변경 시 이벤트 객체가 파라미터(e)에 담겨서 옴
    const onChange = (e) => {
        // e.target에는 이벤트가 발생한 input DOM에 대한 정보를 가지고 있음
    //console.log(e.target);
        // 이벤트가 발생한 DOM의 값 가져오기
        console.log(e.target.value);
        setText(e.target.value);
    }

  //모달에서 변경 누르면 input 데이터 저장. Nick.js에서 데이터를 부르고 rest API로 data.json으로 전달(변경)
    return (
      <div >
  
        <React.Fragment>
              <button className="changevalue" onClick={ openModal }>닉네임 변경</button>
              <NickModal open={ modalOpen } change={ changeModal } close={ closeModal } header="닉네임 변경" ChangeNickname={text}>
              {/* 열기, 닫기, 모달 헤더 텍스트, 패스워드값을 자식으로 보냄 */}     


        <div className="valuename">
            <p>닉네임</p>
        </div>
        <div className="value">
        <input type="text" className="inputvalue" onChange={onChange} value={text} name="nickname" />
        </div>
        <div>
            <h4>* 2자 이상의 한글, 영문, 숫자</h4>
        </div>
              </NickModal>
          </React.Fragment>
      </div>
    );
  }
  
  export default Nick;