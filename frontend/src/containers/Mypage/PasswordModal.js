import React from 'react';
import "../../components/Mypage/CSS/Modal.css";

const Modal = ( props ) => {
    // 열기, 닫기, 모달 헤더 텍스트 패스워드값을 부모로부터 받아옴
    const { open, close, change, header, ChangePassword } = props;
    //패스워드 유효성 검사
    var condition = /^[0-9a-zA-Z]+$/;
    var result=condition.test(ChangePassword);
    return (
        // 모달이 열릴때 openModal 클래스가 생성됨
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (  
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}> &times; </button>
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                    <button className="change" disabled={ChangePassword.length>7&&result===true
                    ?false:true}
                     onClick={change}> 변경 </button>
                        <button className="close" onClick={close}> 닫기 </button>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}

export default Modal;