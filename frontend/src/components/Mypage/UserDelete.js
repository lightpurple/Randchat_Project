import React, {useState} from 'react';
import DeleteModal from '../../containers/Mypage/DeleteModal';
import client from "../../lib/api/client";
const queryString = require('query-string');

const Userdelete = () => {

const [ modalOpen, setModalOpen ] = useState(false);

const openModal = () => {
    setModalOpen(true);
}

const deleteUser = () => {

    console.log(password);

    // var data = {
    //     password: text
    // }

    // 현재 비밀번호 값 보내기
    // client.put('/api/mypage',queryString.stringify(data)).then(res => {
    //     console.log(res)
    //     console.log(data)
    // })

    // 일치 여부는 백에서?

    // 비밀번호 값 일치하면 삭제
    var data = {
        password: password
    }

    // console.log(data);

    client.delete('/api/mypage', queryString.stringify(data))
    .then(response => {
        console.log(response.data);
        // window.location.replace ("/")
    })
    .catch(error => {
        console.error(error);
        alert(error);
    })
    

    // setModalOpen(false);
};

const closeModal = () => {
    setModalOpen(false);
}

const [password, setText] = useState("");
    // 하단 input 박스에서 값 변경 시 이벤트 객체가 파라미터(e)에 담겨서 옴
    const onChange = (e) => {
        // e.target에는 이벤트가 발생한 input DOM에 대한 정보를 가지고 있음
    //console.log(e.target);
        // 이벤트가 발생한 DOM의 값 가져오기
        console.log(e.target.value);
        setText(e.target.value);
    }

return (
    <div className="delete">
    <button className="d_button" onClick={openModal}>계정 삭제</button>
        <DeleteModal open={ modalOpen } change={ deleteUser } close={ closeModal } header="계정 삭제">
              {/* 열기, 닫기, 모달 헤더 텍스트, 패스워드값을 자식으로 보냄 */}
        <div>
        <div className="valuename">
            <p>현재 비밀번호</p>
        </div>
            <input type="text" className="inputvalue" onChange={onChange} value={password}/>
        </div>
        <button className="a_delete" onClick={deleteUser}>삭제</button>
        <button className="a_close" onClick={closeModal}> 닫기 </button>
        <div>
            <h5>* 삭제 버튼을 누르면 계정이 삭제됩니다</h5>
        </div>
            </DeleteModal>
    </div>
);
};
export default Userdelete;