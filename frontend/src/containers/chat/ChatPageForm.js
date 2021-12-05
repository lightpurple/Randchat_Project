import React, { useEffect, useState } from 'react';
import ChatForm from "../../components/chat/ChatForm"
import io from "socket.io-client";
import client from '../../lib/api/client';

const socket = io.connect('http://ec2-13-124-41-101.ap-northeast-2.compute.amazonaws.com:5000/chatting')

const ChatPageForm = () =>{
    
    var handle = null
    const [user, setUser] = useState("")
    const [gender, setGender] = useState("")
    const [roomId, setRoomId ] = useState("")
    const [introduce, setIntro] = useState("")
    const [loading, setLoading] = useState(false)
    const [sysmsg, setSysMsg] = useState("")
    let match = ''
    useEffect(()=>{
        client.get('/chatting/')
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

    const data = {
        nick: user,
        gender: gender
    }
    
    // 남, 녀 버튼 클릭 시
    const findChat = () =>{
        socket.emit("findChat",data)
        startFinding();
    }

    socket.on("Error", (result)=>{
        alert(result)
        console.log(result)
    })

    socket.on("userFinding",(data)=>{
        console.log(data)
        setLoading(true)
        // setSysMsg(msg)
    })
    
    // cancel 버튼 클릭 시
    const stopUserFinding = () => {
        // "findChat" 중 취소 버튼 클릭 시 "stopUserFinding" 호출(nick, gender담아서)
        socket.emit("stopUserFinding", data)
        stopFinding();
        console.log("cancel")
    }
    
    const startFinding = () =>{
        if(handle == null){
            handle = setInterval(()=>{
                socket.emit("randomChatFinding",{nick: user, match_gender:match})
                console.log({nick: user, match_gender:match})
                console.log("찾는")
            }, 500)
        }
    }

    const stopFinding = () => {
        clearInterval(handle)
        handle = null
    }

    socket.on("userMatchingComplete", (data) => {
        stopFinding();
        console.log("찾았다!!")
        console.log(data)
        setRoomId()
            // $("#chat").html("").append("<li><p>대화방에 입장했습니다!!</p><hr></li>");
            // $("#sendMessage").show(); $("#closing").show();
            // $("#ramdomChatFindBtn").hide();
            // setRoomId( data )
    })
    
    socket.on("message", (message)=>{
        setSysMsg(message)
    })

    // socket.emit("message", {message:message})
    
    

    const disconnect = () =>{
        socket.emit("disconnect", {nick: user})
    }
    
    socket.on("sysMsg", (data)=>{
        // $("#chat").append("<li><p>대화방이 종료되었습니다</p><hr></li>");
        //$("#sendMessage").hide(); $("#closing").hide();
        //$("#ramdomChatFindBtn").show();
        socket.emit("ChatClosing",{roomId: roomId})
    })

    

    const Match_Gender = (matchgender) =>{
        match = matchgender
    }
    return(
        <ChatForm 
            user={user}
            socket={socket}
            gender={gender}
            disconnect={disconnect}
            
            cancel={stopUserFinding}
            
            introduce={introduce}
            sysmsg={sysmsg}
            data={data}
            findChat={findChat}
            loading={loading}


            MatchGender={Match_Gender}
        />    
    );
}

export default ChatPageForm;