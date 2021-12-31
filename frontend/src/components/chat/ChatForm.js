import React, { useState } from 'react';
import './CSS/ChatForm.css';
import UserBox from './UserBox';
import ChatLog from './ChatLog';
import Loading from "./Loading";
import Matchgender from '../../containers/chat/Matchgender';

const ChatForm = (props) =>{
    const { socket, user, gender, other, closing, matching, find, findChat, cancel, loading, introduce, sysmsg, data} = props
    const [visible, setVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }
    
    const highFunction = (matchgender)=>{
        props.MatchGender(matchgender)
    }
    

    return(
        <div className="chatback">
            <div className="chatbox">
                <div className="chatboxtitle">
                    <h3>Chat</h3>
                </div>
                    
                <div className="chat">
                    <UserBox other={other} introduce={introduce}/>
                    {socket ? (     
                        <ChatLog socket={socket} sysmsg={sysmsg} other={other}/>
                        ):(
                        <Loading></Loading>
                    )} 

                    {visible && 
                        <div className="menubox" >
                            <button className="menubtn">신고하기</button>
                            <button className="menubtn">차단하기</button>
                            <button className="menubtn" onClick={closing}>나가기</button>
                        </div>
                    }
                </div>

                <div className="inputbox">
                    <form className="chatinput">
                        <input placeholder="Press Enter for send message." > 
                        </input>
                        <button className="inputbtn">입력</button>  
                    </form>
                    <button className="check-btn" onClick={() => setVisible(!visible)}>메뉴</button>
                </div>      
                        
            </div>
            <div className="roombox">

                <div className="boxtitle">
                    <h3>Room</h3>
                </div>

                <div className="Roomlist">
                    <button to='/chat' className="Plus" onClick={openModal}>+</button>
                    <Matchgender 
                        showModal={showModal} 
                        closeModal={closeModal} 

                        socket={socket} 
                        user={user}
                        gender={gender}
                        data={data}
                        
                        find={find}
                        findChat={findChat}
                        matching={matching}
                        cancel={cancel}
                        loading={loading}
                        
                        propFunction={highFunction}
                    ></Matchgender>
            </div>              

            </div>
        </div>
    );
}

export default ChatForm;