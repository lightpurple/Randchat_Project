import React, {useState} from 'react';
import IntroMordal from './IntroModal';
import axios from 'axios';


function Password() {

    const [ modalOpen, setModalOpen ] = useState(false);
  
    const openModal = () => {
        setModalOpen(true);
    }
    const changeModal = () => {
        console.log(text);

    axios.patch('http://localhost:3001/nickname/1', {introduce: text})
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
    }
  
    return (
      <div >
  
        <React.Fragment>
              <button className="changevalue" onClick={ openModal }>소개 변경</button>
              <IntroMordal open={ modalOpen } change={ changeModal } close={ closeModal } header="소개 변경" ChangeIntro={text}>
              
        <div>
        <input type="text" className="inputvalue" onChange={onChange} value={text} name="introduce"/>
        </div>
        <div>
            <h4>* 1~13자의 한글, 영문, 숫자</h4>
        </div>
              </IntroMordal>
          </React.Fragment>
  
  
      </div>
    );
  }
  
  export default Password;