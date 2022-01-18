import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import client from '../../lib/api/client';
import ChatList from '../../components/Mainpage/ChatList';

const ENDPOINT = "http://ec2-13-124-41-101.ap-northeast-2.compute.amazonaws.com:5000"

const socket = io.connect(ENDPOINT)

const MainPage = () =>{

    var handle = null
    const [user, setUser] = useState("")        // nick
    const [gender, setGender] = useState("")    // gender
    const [roomId, setRoomId ] = useState("")   // roomid
    const [other, setOther] = useState("")      // other
    const [introduce, setIntro] = useState("")  // introduce
    const [loading, setLoading] = useState(false)   // Loading
    
    let match = ''  // match_gender
    
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
        // socket.on("userFinding", function(){
        //     setLoading(true);
        //     startFinding();
        // })
    }

    // Error시 알람 띄우기
    useEffect(()=>{
        socket.on("Error", (result)=>{
            alert(result)
            console.log(result)
        })
    },[socket])
    
    
    // userFinding
    socket.on("userFinding", function(){
        setLoading(true);
        startFinding();
    })


    socket.on("userMatchingComplete", function(data){
        stopFinding()
        setRoomId(data.roomId)
        for(var i = 0; i < data.users.length; i++){
            if(data.users[i] !== user){
                setOther(data.users[i])
            }
        }
        console.log(data)
        window.location.href="/chat"
    })
    

    function disconnect(){
        // socket.emit("chatClosingBtn",{roomId: roomId,nick:user})
        // socket.emit("ChatClosing",{roomId: roomId,nick:user})
        // socket.emit("disconnect",{roomId: roomId, nick:user})
        socket.disconnect();
        setRoomId("")
        setOther("")
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
        clearInterval(handle);
        handle = null
        setLoading(false)
        socket.emit("stopUserFinding", {nick:user}); // 서버에 있는 대기열에서 nick 삭제
    }

    // cancel 버튼 클릭 시
    const cancel = () => {
        clearInterval(handle);
        handle = null
        setLoading(false)
        socket.emit("stopUserFinding", {nick:user});
        console.log("취소")
        console.log(handle)
    }

    const Match_Gender = (matchgender) =>{
        match = matchgender
        console.log(match)
    }

    return(
        <ChatList 
            user={user}
            socket={socket}
            gender={gender}
            disconnect={disconnect}
            
            cancel={cancel}
            
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

export default MainPage;