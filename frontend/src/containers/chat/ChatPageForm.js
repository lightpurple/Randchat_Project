/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ChatForm from "../../components/chat/ChatForm"
// import io from "socket.io-client";
// import client from '../../lib/api/client';

// const ENDPOINT = "http://ec2-13-124-41-101.ap-northeast-2.compute.amazonaws.com:5000"

// const socket = io.connect(ENDPOINT)

const ChatPageForm = () =>{

    // var handle = null
    // const [user, setUser] = useState("")        // nick
    // const [gender, setGender] = useState("")    // gender
    // const [roomId, setRoomId ] = useState("")   // roomid
    // const [other, setOther] = useState("")      // other
    // const [introduce, setIntro] = useState("")  // introduce
    // const [loading, setLoading] = useState(false)   // Loading
    
    // let match = ''  // match_gender
    
    // useEffect(()=>{
    //     client.get('/api/chat')
    //         .then((res)=>{
    //         setUser(res.data.nickname)
    //         setGender(res.data.gender)
    //         setIntro(res.data.introduce)
    //         console.log(res.data)
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     })
    // },[user])

    // const data ={
    //     nick:user,
    //     gender:gender
    // }

    
    // useEffect(()=>{
    //     socket.on("Error", (result)=>{
    //         alert(result)
    //         console.log(result)
    //     })
    // },[socket])
    
    
    // // userFinding
    // socket.on("userFinding", function(){
    //     setLoading(true);
    //     startFinding();
    // })


    // socket.on("userMatchingComplete", function(data){
    //     stopFinding()
    //     setRoomId(data.roomId)
    //     for(var i = 0; i < data.users.length; i++){
    //         if(data.users[i] !== user){
    //             setOther(data.users[i])
    //         }
    //     }
    //     console.log(data)
    // })
    

    // function disconnect(){
    //     // socket.emit("chatClosingBtn",{roomId: roomId,nick:user})
    //     // socket.emit("ChatClosing",{roomId: roomId,nick:user})
    //     // socket.emit("disconnect",{roomId: roomId, nick:user})
    //     socket.disconnect();
    //     setRoomId("")
    //     setOther("")
    // }


    // // cancel 버튼 클릭 시
    // const cancel = () => {
    //     clearInterval(handle);
    //     handle = null
    //     setLoading(false)
    //     socket.emit("stopUserFinding", {nick:user});
    //     console.log("취소")
    //     console.log(handle)
    // }

    // const Match_Gender = (matchgender) =>{
    //     match = matchgender
    // }

    return(
        <ChatForm 
            // user={user}
            // socket={socket}
            // gender={gender}
            // disconnect={disconnect}
            
            // cancel={cancel}
            
            // introduce={introduce}
            // other={other}
            // roomId={roomId}
            // data={data}
            
            // findChat={findChat}
            // loading={loading}


            // MatchGender={Match_Gender}
        />    
    );
}

export default ChatPageForm;