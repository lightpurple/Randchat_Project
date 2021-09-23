import React, {useState} from 'react';
import PasswordModal from './PasswordModal';
import axios from 'axios';

function Password() {

    const [ modalOpen, setModalOpen ] = useState(false);
  
    const openModal = () => {
        setModalOpen(true);
    }
    const changeModal = () => {

    axios.patch('http://localhost:3001/nickname/1', {password: text})
    .catch(error => {
        console.error('Error!', error);
    });
        
        setModalOpen(false);
        window.location.reload();
    }
    const closeModal = () => {
        setModalOpen(false);
    } 
    const [text, setText] = useState("");
    const onChange = (e) => {
        console.log(e.target.value);
        setText(e.target.value);
        //if만족-버튼활성화 불만족-비활성화
    }
  
    return (
      <div >
  
        <React.Fragment>
              <button className="changevalue" onClick={ openModal }>비밀번호 변경</button>
              <PasswordModal open={ modalOpen } change={ changeModal } close={ closeModal } header="비밀번호 변경" ChangePassword={text}>
              {/* 열기, 닫기, 모달 헤더 텍스트, 패스워드값을 자식으로 보냄 */}     


        <div className="valuename">
            <p>비밀번호</p>
        </div>
        <div className="value">
        <input type="text" className="inputvalue" onChange={onChange} value={text} name="password" />
        </div>
        <div>
            <h4>* 8자 이상의 영문, 숫자</h4>
        </div>
              </PasswordModal>
          </React.Fragment>
  
  
      </div>
    );
  }
  
  export default Password;