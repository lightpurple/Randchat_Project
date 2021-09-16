import React from 'react';

const Modal = ( props ) => {
    const { open, close, change, header, ChangeIntro } = props;
    var condition = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]/;
    var result=condition.test(ChangeIntro);

    return (
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
                    <button className="change" disabled={1<ChangeIntro.length&&ChangeIntro.length<14&&result===true
                    ?false:true} onClick={change}> 변경 </button>
                        <button className="close" onClick={close}> 닫기 </button>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}

export default Modal;