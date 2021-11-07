import React, {useState} from 'react';
import DeleteModal from '../../containers/Mypage/DeleteModal';
import client from "../../lib/api/client";

const Userdelete = () => {

const [ modalOpen, setModalOpen ] = useState(false);

const openModal = () => {
    setModalOpen(true);
}

const changePassword = () => {

    client.delete("/auth/mypage")
    .then(response => {
        console.log(response.data.nickname);
        window.location.replace ("/")
    })
    .catch(error => {
        console.error(error);
    })
};

const closeModal = () => {
    setModalOpen(false);
}

return (
    <div className="delete">
    <button className="d_button" onClick={openModal}>계정 삭제</button>
        <DeleteModal open={ modalOpen } change={ changePassword } close={ closeModal } header="계정 삭제">
              {/* 열기, 닫기, 모달 헤더 텍스트, 패스워드값을 자식으로 보냄 */}     
        <button className="a_delete" onClick={changePassword}>삭제</button>
        <button className="a_close" onClick={closeModal}> 닫기 </button>
        <div>
            <h5>* 삭제 버튼을 누르면 계정이 삭제됩니다</h5>
        </div>
            </DeleteModal>
    </div>
);
};
export default Userdelete;