import React from 'react';
import {  useHistory } from "react-router-dom";
import "./CSS/Mainpage.css";

const ChatList = ( props ) => {
    const {  socket, user, disconnect, userSetting, loading, roomIdList, onRemove, onToggle, stopFinding, otherIntro, image
    } = props
    
    var matchgender = ''

    const match_gender = ()=>{ 
        props.MatchGender(matchgender)
    }

    return(
    <div className="MainpageBox">
        <h3>현재 채팅방 수 : {roomIdList ? roomIdList.length:0}</h3>
        <div className='Match'>
            {loading ? <p>대화상대 찾는 중....</p> : <p>상대방을 선택하여 대화를 시작해보세요</p>}
            {loading? (
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
                </>
            )}
        </div>
        {(roomIdList)?(
            <div>
                {roomIdList && roomIdList.map(room => (
                    <Room room={room} key={room.id} onRemove={onRemove} onToggle={onToggle} disconnect={disconnect} user={user} socket={socket} otherIntro={otherIntro} image={image}/>
                ))}
            </div>
        ):(null)}
    </div>
    )
}

function Room({ room, onRemove, onToggle, otherIntro, user, socket}){
    const history = useHistory()
    var image = room.image
    return(
        
        <div className="ProfileImg">
            <img 
                src={(room.image)? image :process.env.PUBLIC_URL+'/1946429.png'}
                alt="profile"
                className="Img1"
                style={{
                    cursor: 'pointer'  
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
                            image,
                        },
                        socket
                    })
                }}
            ></img> 
            <div>{room.other}
            <button className="ChatClose" 
                onClick={() => {
                    onRemove(room.id) 
                    socket.disconnect()
            }}>끝내기</button>
            </div>
        </div>
    )
}

export default React.memo(ChatList);