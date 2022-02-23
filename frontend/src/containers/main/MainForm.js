/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import io from "socket.io-client";
import client from '../../client';
import MainPage from '../../components/Main/MainPage';

const ENDPOINT = "http://ec2-3-38-105-249.ap-northeast-2.compute.amazonaws.com:5000"

const socket = io.connect(ENDPOINT)

const MainForm = () =>{
    
    const [user, setUser] = useState("")        // nick
    const [gender, setGender] = useState("")    // gender
    const [introduce, setIntro] = useState("")  // introduce
    const [otherIntro, setOtherIntro] = useState("")
    const [other, setOther] = useState("")
    const [roomId, setRoomId] = useState("")
    const [loading, setLoading] = useState(false)   // Loading
    const [sysMsg, setSysMsg] = useState("")
    const [image, setImage] = useState("")
    let match = ''  // match_gender
    var num
    
    useEffect(()=>{
        client.get("/api/chat")
            .then((res)=>{
            setUser(res.data.nickname)
            setGender(res.data.gender)
            setIntro(res.data.introduce)
            localStorage.setItem("user",res.data.nickname)
        })
        .catch(error => {
            console.error(error);
        })
        stopFinding()
        socket.emit("userRelease", {nick:localStorage.getItem("user")});

        if(JSON.parse(localStorage.getItem("roomIdList"))) {
            setRoomIdList(JSON.parse(localStorage.getItem("roomIdList")))
            
        } else {
            setRoomIdList([])
        }
    },[])

    const [roomIdList, setRoomIdList] = useState([])
    
    num = (roomIdList.length === 0) ? 0 : roomIdList[roomIdList.length-1].id
    const nextId = useRef(num)



    const roomplus = useCallback(({roomId, other,otherIntro, image}) => {
        nextId.current += 1
        const room = {
            id: nextId.current,
            roomId,
            other,
            otherIntro,
            image,
        }

        let filterOther = []
        if(roomIdList){
            filterOther = roomIdList.map((room)=> room.other)
            
        }
        if(!filterOther.includes(room.other))
        {    
            setRoomIdList(roomIdList.concat(room))
            localStorage.setItem("roomIdList",JSON.stringify(roomIdList.concat(room)))
            nextId.current += 1
        }

    },[roomIdList, roomId, other, user])

    const onRemove = useCallback(
        id => {
            setRoomIdList(roomIdList.filter(room => room.id !== id))
            localStorage.setItem("roomIdList",JSON.stringify(roomIdList.filter(room => room.id !== id)))
            socket.disconnect()
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
    
    // 남, 녀 버튼 클릭 시
    const userSetting = () =>{
        socket.emit("userSetting",{nick: user, gender: gender, matchGender: match})
    }
    // Error시 알람 띄우기
    useEffect(()=>{
        socket.on("Error", (result)=>{
            alert(result)
        })
    },[socket])
    
    // userReady
    socket.on("userReady", function(){
        setLoading(true);
        startFinding();
    })

    
    socket.on("roomReady", function(data){
        stopFinding()
        setRoomId(data.roomId)
        setOther(data.users.filter((nick) => nick !== localStorage.getItem("user"))[0])
        socket.emit("infoSetting",{nick:data.users.filter((nick) => nick !== localStorage.getItem("user"))[0],roomId:data.roomId})
    })
    
       

    socket.on("infoReady",function(data){
        setOtherIntro(data.introduce)
        setImage(data.image)
        if(other) roomplus({roomId, other, otherIntro, image})
    })

    socket.on("sysMsg",(data)=>{
        setSysMsg(data.message)
    })
    
    const MatchGender = (matchgender) =>{
        match = matchgender
    }

    const [delay, setDelay]= useState(null)

    const startFinding = ()=>{
        setDelay(1000)
    }

    const stopFinding = () =>{ 
        setLoading(false)
        setDelay(null)
        socket.emit("userRelease", {nick:user});
    }

    useEffect(()=>{
        if(delay !== null){
            let id = setInterval(function(){
                socket.emit("roomSetting", {nick:user})
            }, delay)
            return() => clearInterval(id)
        }
    },[delay])

    return(
        <MainPage 
            user={user}
            socket={socket}
            gender={gender}
            
            // disconnect={disconnect}

            stopFinding={stopFinding}
            
            introduce={introduce}
            otherIntro={otherIntro}

            other={other}
            roomId={roomId}
            roomIdList = {roomIdList}
            sysMsg={sysMsg}
            image={image}
            
            userSetting={userSetting}
            loading={loading}
        
            MatchGender={MatchGender}

            onRemove={onRemove}
            onToggle={onToggle}

        />    
    );
}


export default React.memo(MainForm);