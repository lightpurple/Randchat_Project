/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import ChatPage from "../../components/chat/ChatPage"
import { useHistory, withRouter } from 'react-router-dom';
import io from "socket.io-client";
const ENDPOINT = "http://ec2-13-124-41-101.ap-northeast-2.compute.amazonaws.com:5000"

const socket = io.connect(ENDPOINT,{transport:['websocket']})
const ChatForm = ({ location, history}) =>{

    const [userList, setUserList] = useState([])
    const [user, setUser] = useState("")
    const [other, setOther] = useState("")
    const [otherIntro, setOtherIntro] = useState("")
    const [roomID, setRoomID] = useState("")
    // const info = history.location.state
    // // const socket = history.location.socket


    // //{user: '1234', otherIntro: '', roomId: 1643360291499, other: '1234e'}
    // useEffect(()=>
    // {   
    //     setUser(info.user)
    //     setOther(info.other)
    //     setOtherIntro(info.otherIntro)
    //     setRoomID(info.roomId)

    //     // info && localStorage.setItem("infomation",JSON.stringify(info))
    //     // socket && localStorage.setItem("socket", socket)
        
    //     const unblock = history.block('정말 떠나실건가요?')
    //     return()=>{
    //         unblock()
    //     }
    // },[history])

    // const [sysMsg, setSysMsg] = useState("");
    // const [chatMsg, setChatMsg] = useState({
    //     roomId : `${roomID}`,
    //     message : '',
    //     nick : `${user}`
    // })

    // const { roomId, message, nick} = chatMsg

    // const ChatChange = useCallback(
    //     e =>{
    //         const {name,value} = e.target
    //         setChatMsg({
    //             ...chatMsg,
    //             roomId : `${roomID}`,
    //             [name] : value,
    //             nick : `${user}`
    //         })
    //     }
    // )

    // const [chatMsgList, setChatMsgList] = useState([])

    // const ChatSubmit = useCallback(
    //     e =>{
    //         if(!message){
    //             alert("대화내용을 입력해주세요")
    //             return
    //         }
            
            
    //         console.log({roomId: roomID, message:message, nick: user})

    //         const msg = {
    //             roomId,
    //             message,
    //             nick
    //         }
    //         console.log(msg)
    //         console.log(message)
    //         socket.emit("message", {roomId: roomID, message:message, nick: user})
    //         setChatMsg({
    //             roomId : `${roomID}`,
    //             message : '',
    //             nick : `${user}`
    //         })
    //         console.log("끝"+ chatMsg)
    //         console.log(chatMsg)
    //         e.preventDefault()
    //     }
    // )
    // useEffect(()=>{
    //         socket.on("message", (data) =>{
    //             setChatMsgList(chatMsgList.concat(data))
    //             console.log(chatMsgList)
    //             console.log("송신" + data)
    //             console.log(2);
    //         })

    //         socket.on("sysMsg", (data)=>{
    //             setSysMsg(data.message)
    //             alert(data)
    //             console.log(data)
    //         })

    //         socket.on("test",function(data){
    //             alert(data)
    //             console.log(data)
    //         })
    // },[socket])
    

    // const ban = () =>{
    //     socket.emit("ban", {roomId : roomId, user:user, other:other})
    //     socket.on("banComplete",(result)=>{
    //         alert(result)
    //         console.log(result)
    //         socket.disconnect()
    //     })
    // }
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

            // user={user}
            // other={other}
            // otherIntro={otherIntro}
            // roomId={roomID}

            // sysMsg={sysMsg}
            // message={message}

            onListRemove={onListRemove}
            // ChatChange={ChatChange}
            // ChatSubmit={ChatSubmit}
            // ban={ban}
        />    
    );
}

export default withRouter (ChatForm);