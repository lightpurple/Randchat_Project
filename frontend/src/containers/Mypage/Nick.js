import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import client from "../../client";
const queryString = require('query-string');

export default function Nick() {

  const [ Open, setModal ] = useState(false);

  const [introduce, setUsers] = useState(null);
  client.get("/api/mypage")
  .then(response => {
    setUsers(response.data.introduce);
  })
  .catch(error => {
    console.error(error);
  })
  const changeNick = () => {
    console.log(text);

  var data = {
    introduce: introduce,
    nickname: text
  }

  client.put('/api/mypage',queryString.stringify(data)).then(res => {
    console.log(res)
    console.log(data)
  })
  setModal(false);
}

  const [text, setText] = useState("");
  var condition = /^[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+$/;
  var result=condition.test(text);

  const onChange = (e) => {
      console.log(e.target.value);
      setText(e.target.value);
  }

  return (
    <>
    <Button className="btn btn-outline-dark" onClick={() => setModal(true)}>닉네임 변경</Button>
    <Modal
    size="default"
    show={Open}
    aria-labelledby="example-modal-sizes-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
        닉네임 변경
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="valuename">
          <p>변경할 닉네임</p>
        </div>
      <input type="text" className="input" onChange={onChange} value={text} name="nickname"/>
      </Modal.Body>

      <Modal.Footer>
      <button className="change" disabled={text.length>1&&text.length<11&&result===true?false:true} onClick={changeNick}>변경</button>
      <button onClick={() => setModal(false)}className="a_close"> 닫기</button>
      <div>
        <h5 style={{color: "#5a5a5a"}}>* 2자~10자의 한글, 영문, 숫자를 입력하세요</h5>
    </div>

    <div className="hidden">
      <p>{introduce}</p>
    </div>
    </Modal.Footer>
  </Modal>
  </>
  );
}