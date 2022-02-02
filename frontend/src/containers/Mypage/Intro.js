import React, {useState} from 'react';
import IntroMordal from './IntroModal';
import client from "../../lib/api/client";
const queryString = require('query-string');


function Password() {

    const [ modalOpen, setModalOpen ] = useState(false);
  
    const [nickname, setUsers] = useState(null);
    client.get("/api/mypage")
      .then(response => {
        setUsers(response.data.nickname);
      })
      .catch(error => {
        console.error(error);
      })

      const openModal = () => {
        setModalOpen(true);
    }
    const changeModal = () => {
        console.log(text);


        var data = {
            introduce: text,
            nickname: nickname
        }

        client.put('/api/mypage',queryString.stringify(data)).then(res => {
            console.log(res)
            console.log(data)
        })
        // var data = {
        //     nickname: 'qqwwee'
        // }
    
        // client({
        //     method: 'put',
        //     url: '/api/mypage',
        //     introduce: data.introduce
        // })
        // .then(function(response) {
        //     console.log(response.data);
        // })
        // .catch(function(error) {
        //     console.error('Error!', error);
        // });
    
        
        setModalOpen(false);
        // window.location.reload();
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
      <div className='IntroCSS'>
  
        <>
  
              <button className="changevalue" onClick={ openModal }>소개 변경</button>
              <IntroMordal open={ modalOpen } change={ changeModal } close={ closeModal } header="소개 변경" ChangeIntro={text}>
              
          <div>
          <input type="text" className="inputvalue" onChange={onChange} value={text} name="introduce"/>
          </div>
          <div>
              <h4>* 1~13자의 한글, 영문, 숫자</h4>
        </div>
            </IntroMordal>
        </>
        <div className="hidden">
        <p>{nickname}</p>
        </div>
      </div>
    );
  }
  
  export default Password;