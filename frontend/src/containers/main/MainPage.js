/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import io from "socket.io-client";
import client from '../../lib/api/client';
import ChatList from '../../components/Mainpage/ChatList';

const ENDPOINT = "http://ec2-13-124-41-101.ap-northeast-2.compute.amazonaws.com:5000"

const socket = io.connect(ENDPOINT)

const MainPage = () =>{

    const [user, setUser] = useState("")        // nick
    const [gender, setGender] = useState("")    // gender
    const [introduce, setIntro] = useState("")  // introduce
    const [loading, setLoading] = useState(false)   // Loading
    const roomId = ''
    const other = ''

    const [roomIdList, setRoomIdList] = useState([])
  
    const nextId = useRef(0)

    const roomplus = useCallback(({roomId, other}) => {
        const room = {
            id: nextId.current,
            roomId,
            other
        }
        let filterOther = roomIdList.map((room) => room.other)
        console.log(filterOther)
        console.log(room)
        console.log(roomIdList)
        if(!filterOther.includes(room.other)){
            setRoomIdList(roomIdList.concat(room))
            localStorage.setItem("roomIdList",JSON.stringify(roomIdList))
            nextId.current += 1
            console.log("등록완료")
            console.log(roomIdList)
            console.log("등록 : " + localStorage.getItem("roomIdList") )
        } else{
            setRoomIdList(JSON.parse(localStorage.getItem("roomIdList")))
        }
    },[roomIdList, roomId, other, user])

    const onRemove = useCallback(
        id => {
            setRoomIdList(roomIdList.filter(room => room.id !== id))
            console.log(roomIdList)
            localStorage.setItem("roomIdList",JSON.stringify(roomIdList.filter(room => room.id !== id)))
        },
        [roomIdList]
    )



    const onToggle = useCallback(
        id => {
            setRoomIdList(
                roomIdList.map(room =>
                    room.id === id ? { ...room, active: !room.active } : room
                )
            );
        },
        [roomIdList]
    )
    
    let match = ''  // match_gender
    
    useEffect(()=>{
        client.get("/api/chat")
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

    useEffect(()=>{
        setRoomIdList(JSON.parse(localStorage.getItem("roomIdList")))
    },[])
    
    // 남, 녀 버튼 클릭 시
    const userSetting = () =>{
        socket.emit("userSetting",{nick: user, gender: gender, matchGender: match})
        console.log("userSetting")
    }

    // Error시 알람 띄우기
    useEffect(()=>{
        socket.on("Error", (result)=>{
            alert(result)
            console.log(result)
        })
    },[socket])
    
    // userReady
    socket.on("userReady", function(){
        setLoading(true);
        startFinding();
    })


    const ChattingList = {
        socket:socket,
        roomId : roomId,
        user: user,
        other : other
    }
    
    useEffect(()=>{
        socket.on("roomReady", function(data){
            stopFinding()
            var roomId = data.roomId
            var other = data.users.filter((nick)=> nick !== user)[0]
            console.log("user : " + user)
            console.log("other : " + other)
            roomplus({roomId, other})
            
            // console.log(data)
            // window.location.href="/chat"
            // history.push({
            //     pathname: `/chat/:${roomId}`,
            //     props : {
            //         ChattingList
            //     }
            // })
            // if(data.roomId){
            //     window.history.pushState(
            //         ChattingList,
            //         `/chat/:roomId`
            //     )
            // }
        })
    },[socket, user, roomplus, roomId, other])
    
    // socket.on("roomReady",function(){
    //     stopFinding()
    // })

    
    
    // socket.on("infoSetting",{ nick: other, roomId:roomId})
    // socket.emit("infoReady",{introduce:introduce})

    const disconnect = () =>{
        socket.disconnect()
    }
    
    const MatchGender = (matchgender) =>{
        match = matchgender
        console.log(match)
    }

    const [delay, setDelay]= useState(null)

    const startFinding = ()=>{
        setDelay(1000)
    }

    const stopFinding = () =>{
        socket.emit("userRelease", {nick:user});
        setDelay(null)
        setLoading(false)
    }

    useEffect(()=>{
        if(delay !== null){
            let id = setInterval(function(){
                socket.emit("roomSetting", {nick:user})
            }, delay)
            return() => clearInterval(id)
        }
    },[delay, user, socket])

    return(
        <ChatList 
            user={user}
            socket={socket}
            gender={gender}
            
            disconnect={disconnect}
            stopFinding={stopFinding}
            
            introduce={introduce}

            other={other}
            roomId={roomId}


            roomIdList = {roomIdList}
            
            userSetting={userSetting}
            loading={loading}
            

            MatchGender={MatchGender}

            // onChange={onChange}
            // onCreate={onCreate}
            onRemove={onRemove}
            onToggle={onToggle}
        />    
    );
}


export default React.memo(MainPage);