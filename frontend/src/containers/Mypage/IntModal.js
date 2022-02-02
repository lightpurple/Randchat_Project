import React from 'react'
import './Modal.css'

// Modal.jsx


const Modal = ({modalClose}) => {

    const onCloseModal = (e) => {
        console.log('e.target: ', e.target)
        console.log('e.tarcurrentTargetget: ', e.currentTarget)
        if(e.target === e.currentTarget){
            modalClose()
        }

    }
    return (
        <div className="modal__container" onClick={onCloseModal}>
            <div className="modal">
                <button className="modal__button" onClick={modalClose}> Modal Close</button>
            </div>
        </div>
    )
}

export default Modal
