import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import client from "../../client";
const queryString = require('query-string');

export default function Intro() {

  const [ Open, setModal ] = useState(false);

  const [nickname, setUsers] = useState(null);
  client.get("/api/mypage")
    .then(response => {
      setUsers(response.data.nickname);
    })
    .catch(error => {
      console.error(error);
    })

  const changeIntro = () => {
    console.log(text);

    var data = {
      introduce: text,
      nickname: nickname
    }

    client.put('/api/mypage',queryString.stringify(data)).then(res => {
      console.log(res)
      console.log(data)
    })
    setModal(false);
}

  const [text, setText] = useState("");
  var condition = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]/;
  var result = condition.test(text);

  const onChange = (e) => {
      console.log(e.target.value);
      setText(e.target.value);
  }

  return (
  <> 
  <Button className="btn btn-outline-dark" onClick={() => setModal(true)}>소개 변경</Button>
  <Modal
  size="default"
  show={Open}
  aria-labelledby="example-modal-sizes-title-lg">
    <Modal.Header closeButton>
      <Modal.Title id="example-modal-sizes-title-lg">
        소개 변경
      </Modal.Title>
    </Modal.Header>
    
    <Modal.Body>
      <div className="valuename">
        <p>변경할 한마디</p>
        </div>
      <input type="text" className="input" onChange={onChange} value={text} name="introduce"/>
    </Modal.Body>

    <Modal.Footer>
      <button className="change" disabled={1<text.length&&text.length<14&&result===true?false:true} onClick={changeIntro}>변경</button>
      <button onClick={() => setModal(false)}className="a_close"> 닫기</button>
      <div>
      <h5 style={{color: "#5a5a5a"}}>* 1~13자의 한글, 영문, 숫자를 입력하세요</h5>
      </div>

      <div className="hidden">
        <p>{nickname}</p>
      </div>
    </Modal.Footer>
  </Modal>
  </>
  );
}