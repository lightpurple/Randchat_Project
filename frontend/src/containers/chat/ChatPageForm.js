import React, { useEffect, useState } from 'react';
import ChatForm from "../../components/chat/ChatForm"
import io from "socket.io-client";
import client from '../../lib/api/client';

const ENDPOINT = "http://ec2-13-124-41-101.ap-northeast-2.compute.amazonaws.com:5000"

const socket = io.connect(ENDPOINT)

const ChatPageForm = () =>{

    var handle = null
    const [user, setUser] = useState("")        // nick
    const [gender, setGender] = useState("")    // gender
    const [roomId, setRoomId ] = useState("")   // roomid
    const [other, setOther] = useState("")      // other
    const [introduce, setIntro] = useState("")  // introduce
    const [loading, setLoading] = useState(false)   // Loading

    let match = ''  // match_gender
    var success = false
    
    useEffect(()=>{
        client.get('/api/chat')
            .then((res)=>{
            setUser(res.data.nickname)
            setGender(res.data.gender)
            setIntro(res.data.introduce)
            console.log(res.data)
        })
        .catch(error => {
            console.error(error);
        })
    },[user])

    const data ={
        nick:user,
        gender:gender
    }

    
    // 남, 녀 버튼 클릭 시
    const findChat = () =>{
        socket.emit("findChat",{nick: user, gender: gender})
        console.log("findchat")
        console.log({nick: user, gender: gender, match_gender: match})
    }

    // Error시 알람 띄우기
    socket.on("Error", (result)=>{
        alert(result)
        console.log(result)
    })
    // userFinding
    socket.on("userFinding", function(){
        setLoading(true);
        startFinding();
    })

    // cancel 버튼 클릭 시
    const cancel = () => {
        stopFinding();
        console.log("cancel")
    }
    // useEffect(()=>{
    //     socket.on("userMatchingComplete", function(data){
    //         stopFinding()
    //         setRoomId(data.roomId)
    //         setOther(data.other)
    //         // success = true
    //         console.log(data)
    //         console.log(success)
    //     })
    // },[socket])
    socket.on("userMatchingComplete", function(data){
        stopFinding()
        setRoomId(data.roomId)
        for(var i = 0; i < data.users.length; i++){
            if(data.users[i] !== user){
                setOther(data.users[i])
            }
        }
        // success = true
        console.log(data)
        console.log(success)
    })
    

    function disconnect(){
        socket.emit("chatClosingBtn",{roomId: roomId})
        socket.emit("ChatClosing",{roomId: roomId})
        setRoomId("")
        setOther("")
        success = false
        console.log(success)
    }

    
    function startFinding(){
        if(handle === null){
            handle = setInterval(function(){
                socket.emit("randomChatFinding",{nick: user, match_gender:match})
                console.log({nick: user, match_gender:match})
                console.log("찾는")
            }, 1000)
        }
    }

    function stopFinding(){
        if(handle !== null) {
            clearInterval(handle);
            handle = null
        }
        setLoading(false)
        socket.emit("stopUserFinding", {nick:user}); // 서버에 있는 대기열에서 nick 삭제
    }
    

    const Match_Gender = (matchgender) =>{
        match = matchgender
    }

    return(
        <ChatForm 
            user={user}
            socket={socket}
            gender={gender}
            disconnect={disconnect}
            
            cancel={cancel}
            success={success} // 매칭 성공 시 모달 창 닫기
            
            introduce={introduce}
            other={other}
            roomId={roomId}
            data={data}
            
            findChat={findChat}
            loading={loading}


            MatchGender={Match_Gender}
        />    
    );
}

export default ChatPageForm;