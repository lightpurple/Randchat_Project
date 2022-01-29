/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import ChatPage from "../../components/chat/ChatPage"
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ChatForm = ({props, match}) =>{
    const [userList, setUserList] = useState([])
    const [user, setUser] = useState("")
    const [other, setOther] = useState("")
    const [otherIntro, setOtherIntro] = useState("")
    const [roomId, setRoomId] = useState("")
    const [socket, setSocket] = useState("")
    // const info = JSON.parse(props.props)
    // console.log(info)
    console.log(match)
    console.log(props.props)


    useEffect((e)=>
    {   
        // localStorage.setItem("history",props.props)
        // dispatch(listProducts(roomIdParam))
        setUserList(JSON.parse(localStorage.getItem("roomIdList")))
        // setUser(info.user)
        // setOther(info.other)
        // setOtherIntro(info.otherIntro)
        // setRoomId(info.roomId)
        // setSocket(info.socket)
        // console.log(localStorage.getItem("history"))
    },[])
    return(
        <ChatPage
            userList={userList}
        />    
    );
}

export default withRouter (ChatForm);