import React,{useState} from 'react';
import Loader from "./Loader";
import { Link, useHistory } from "react-router-dom";
import "./CSS/Mainpage.css";

const ChatList = ( props ) => {
    const {  socket, user, disconnect, userSetting, loading, roomIdList, onRemove, onToggle, stopFinding, otherIntro} = props
    
    var matchgender = ''

    const match_gender = ()=>{ 
        props.MatchGender(matchgender)
    }

    return(
    <div className="MainpageBox">
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
                    <Room  room={room} key={room.id} onRemove={onRemove} onToggle={onToggle} disconnect={disconnect} user={user} socket={socket} otherIntro={otherIntro}/>
                ))}
            </div>
        ):(null)}
        
    </div>
    )
}

function Room({ room, onRemove, onToggle, otherIntro, user, socket}){
    const history = useHistory()

    return(
        <div className="ProfileImg">
            <div 
                className="Img1"
                style={{
                    cursor: 'pointer',
                    color: room.active ? 'green' : 'black'
                }}
                onClick={() => {
                    onToggle(room.id)
                    let roomId = room.roomId
                    let other = room.other
                    history.push({
                        pathname: `/chat/:${roomId}`,
                        state: {
                            user,
                            otherIntro,
                            roomId,
                            other,
                        },
                        socket
                        
                    }
                    )
                    console.log(roomId)
        
                }}
            >{room.other}</div> 

            <button className="close" 
                onClick={() => {
                    onRemove(room.id) 
                    // disconnect()
                }}>&times;</button>
        </div>
    )
}

export default React.memo(ChatList);