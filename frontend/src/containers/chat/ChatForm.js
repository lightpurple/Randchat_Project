/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import ChatPage from "../../components/chat/ChatPage"
import { withRouter } from 'react-router-dom';
import io from "socket.io-client";
const ENDPOINT = "http://ec2-3-38-105-249.ap-northeast-2.compute.amazonaws.com:5000"

const socket = io.connect(ENDPOINT)
const ChatForm = ({ history}) =>{
    
    const [userList, setUserList] = useState([])
    const [user, setUser] = useState("")
    const [other, setOther] = useState("")
    const [otherIntro, setOtherIntro] = useState("")
    const [roomId, setRoomID] = useState("")
    // const info = history.location.state
    // // const socket = history.location.socket

    // //{user: '1234', otherIntro: '', roomId: 1643360291499, other: '1234e'}
    // useEffect(()=>
    // {   
    //     setUser(info.user)
    //     setOther(info.other)
    //     setOtherIntro(info.otherIntro)
    //     setRoomID(info.roomId)

        // info && localStorage.setItem("infomation",JSON.stringify(info))
        // socket && localStorage.setItem("socket", socket)
    // },[history])

    const [sysMsg, setSysMsg] = useState("");
    const [chatMsg, setChatMsg] = useState({message : ""})

    const {message} = chatMsg

    const onChatChange = e =>{
        setChatMsg({...chatMsg, [e.target.name]: e.target.value})
    }

    const [chatMsgList, setChatMsgList] = useState([])

    const onChatSubmit = (e) =>{
        e.preventDefault()
   
        console.log({roomId: roomId, message: message, nick: user})

        if(!message){
            alert("대화내용을 입력해주세요")
            return
        }

        console.log(message)
        socket.emit("message", {roomId: roomId, message:message, nick: user})
        setChatMsg({message : ""})

        console.log(chatMsg)   
    }

    useEffect(()=>{
        socket.on("msg", (data) =>{
            setChatMsgList(chatMsgList.concat(data))
            console.log(chatMsgList)
            console.log(data)
            console.log(2);
        })

        socket.on("sysMsg", (data)=>{
            setSysMsg(data.message)
            alert(data)
            console.log(data)
        })

        socket.on("test", (data)=>{
            alert(data)
        })
    },[])


    const ban = () =>{
        socket.emit("ban", {roomId : roomId, user:user, other:other})
        socket.on("banComplete",(result)=>{
            alert(result)
            console.log(result)
            socket.disconnect()
        })
    }
    useEffect(()=>{
        setUserList(JSON.parse(localStorage.getItem("roomIdList")))
    },[])

    const onListRemove = useCallback(
        id => {
            setUserList(userList.filter(user => user.id !== id))
            console.log(userList)
            localStorage.setItem("roomIdList", JSON.stringify(userList.filter(room => room.id !== id)))
            socket.disconnect()
        },
        [userList]
    )


    return(
        <ChatPage
            userList={userList}

            user={user}
            other={other}
            otherIntro={otherIntro}
            roomId={roomId}

            sysMsg={sysMsg}
            message={message}

            onListRemove={onListRemove}
            onChatChange={onChatChange}
            onChatSubmit={onChatSubmit}
            ban={ban}
        />    
    );
}

export default withRouter (ChatForm);