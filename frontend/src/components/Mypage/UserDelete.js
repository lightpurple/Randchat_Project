import React, {useState} from "react";
import '../Mypage/CSS/Modal.css';
import {Modal, Button} from 'react-bootstrap';
import client from "../../../src/client";
const queryString = require('query-string');

export default function UserDelete() {
  const [ Open, setModal] = useState(false);

  const [password, setText] = useState("");
    const onChange = (e) => {
        console.log(e.target.value);
        setText(e.target.value);
    }

  const deleteUser = () => {
    console.log(password);
    
    var data = {
      password: password
    }
    
    client.delete("/api/mypage", queryString.stringify(data)
    )
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
        alert(error);
    })

  };

  return (
    <>
      <Button className="btn btn-outline-secondary" onClick={() => setModal(true)}>계정 삭제</Button>
      <Modal
        size="default"
        show={Open}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
          계정 삭제
          </Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="valuename">
                <p>현재 비밀번호</p>
            </div>
                <input type="password" className="inputvalue" onChange={onChange} value={password}/></Modal.Body>
                <Modal.Footer>
                <button className="a_delete" onClick={deleteUser}>삭제</button>
            <button onClick={() => setModal(false)}className="a_close"> 닫기 </button>
            <div>
                <h5>* 삭제 버튼을 누르면 계정이 삭제됩니다</h5>
                </div>
                </Modal.Footer>
      </Modal>
    </>
  );
}