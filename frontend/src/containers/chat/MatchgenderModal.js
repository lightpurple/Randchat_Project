import React from 'react'
import '../../components/chat/CSS/Modal.css'

const MatchgenderModal = (props) => {
    const { open, close, header, cancel, find, matching } = props;

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
                            {find ? (
                                <button className="change" onClick={()=>{   
                                    cancel()
                                    close()
                                }}> 취소 </button>
                            ):(
                                <button className="change" onClick={()=>{   
                                    matching()
                                }}> 매칭 </button>
                            )}
                            
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