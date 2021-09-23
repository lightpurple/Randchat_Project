import React from 'react';

const Modal = ( props ) => {
    const { open, close, change, header, ChangeNickname } = props;
    var condition = /^[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+$/;
    var result=condition.test(ChangeNickname);
    return (
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (  
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}> &times;
                        </button>
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                    <button className="change" disabled={ChangeNickname.length>1&&result===true
                    ?false:true} onClick={change}> 변경 </button>
                        <button className="close" onClick={close}> 닫기 </button>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}

export default Modal;