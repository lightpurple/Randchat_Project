import React, { useState } from 'react';
import Matchgender from '../../containers/chat/Matchgender';

import './CSS/RoomBox.css';

const RoomBox = () =>{
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <div className="roombox">

            <div className="boxtitle">
                <h3>Room</h3>
            </div>

            <div className="Roomlist">
                <button to='/chat' className="Plus" onClick={openModal}>+</button>
                <Matchgender showModal={showModal} closeModal={closeModal}></Matchgender>
            </div>              

        </div>

    );
}

export default RoomBox;