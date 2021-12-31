import React from 'react'
import '../../components/chat/CSS/Modal.css'

const MatchgenderModal = (props) => {
    const { open, close, header, cancel } = props;

    return (
        <>
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
                            <button className="change" onClick={()=>{   
                                cancel()
                                close()
                            }}> 취소 </button>
                            
                            <button className="close" onClick={()=>{   
                                cancel()
                                close()
                            }}> 닫기 </button>
                        </footer>
                    </section>
                ) : null }
            </div>
        </>
    )
}


export default MatchgenderModal