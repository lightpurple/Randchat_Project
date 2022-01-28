import React from 'react';
import Loader from "./Loader";
import { Link } from "react-router-dom";
import "./CSS/Mainpage.css";

const ChatList = ( props ) => {
    const {  user, disconnect, userSetting, loading, introduce, roomIdList, onRemove, onToggle, stopFinding} = props

    var matchgender = ''

    const onLogout = () => {
        localStorage.clear();
    };

    const match_gender = ()=>{ 
        props.MatchGender(matchgender)
    }

    
    // console.log(roomIdList)
    // console.log(roomList)
    return(
    <div className="MainpageBox">
        <Link to="/" className="headermenu" onClick={onLogout}>Logout</Link>
        <p>{user}</p>
        <p>{introduce}</p>
        <h3>현재 채팅방 수 : {roomIdList ? roomIdList.length:0}</h3>
        <div className='Match'>
            {loading ? <Loader></Loader> : <p>상대방을 선택하여 대화를 시작해보세요</p>}
            { loading? (
                <button onClick={()=>{   
                    stopFinding()
                }}>취소</button>
            ):(
                <>
                    <button 
                        id='matchgender'
                        onClick={()=>{
                            matchgender = 'M'
                            match_gender()
                            userSetting()
                        }}
                    >Male</button>
                    <button
                        id='matchgender'
                        onClick={()=>{
                            matchgender = 'F'
                            match_gender()
                            userSetting()
                        }}
                    >Female</button>
                    <button onClick={()=>{   
                        stopFinding()
                    }}>취소</button>
                </>
            )}
        </div>
        {roomIdList?(
            <div>
                {roomIdList.map(room => (
                    <Room  room={room} key={room.id} onRemove={onRemove} onToggle={onToggle} disconnect={disconnect}/>
                ))}
            </div>
        ):(null)}
        
    </div>
    )
}

function Room({ room, onRemove, onToggle, disconnect}){
    return(
        <div className="ProfileImg">
            <div 
                className="Img1"
                style={{
                    cursor: 'pointer',
                    color: room.active ? 'green' : 'black'
                }}
                onClick={() => onToggle(room.id)}
            >{room.other}</div> 

            <button className="close" 
                onClick={() => {
                    onRemove(room.id) 
                    disconnect()
                }}>&times;</button>
        </div>
    )
}

export default React.memo(ChatList);