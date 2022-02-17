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
    const [loading, setLoading] = useState(false)   // Loading
    const [sysMsg, setSysMsg] = useState("")
    let match = ''  // match_gender
    var num
    
    useEffect(()=>{
        client.get("/api/chat")
            .then((res)=>{
            setUser(res.data.nickname)
            setGender(res.data.gender)
            setIntro(res.data.introduce)
            localStorage.setItem("user",res.data.nickname)
            console.log(res.data)
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

    const roomId = ''
    const other = ''

    const [roomIdList, setRoomIdList] = useState([])
    
    
    num = (roomIdList.length === 0) ? 0 : roomIdList[roomIdList.length-1].id
    const nextId = useRef(num)



    const roomplus = useCallback(({roomId, other}) => {
        nextId.current += 1
        console.log("두번째 : " + nextId.current)
        const room = {
            id: nextId.current,
            roomId,
            other
        }

        let filterOther = []
        if(roomIdList){
            filterOther = roomIdList.map((room)=> room.other)
            
        }
        console.log(filterOther)
        if(!filterOther.includes(room.other))
        {    
            console.log(room)
            setRoomIdList(roomIdList.concat(room))
            console.log(roomIdList)
            localStorage.setItem("roomIdList",JSON.stringify(roomIdList.concat(room)))

            nextId.current += 1
            
            console.log(roomIdList) //[]
            console.log("등록 : " + localStorage.getItem("roomIdList") ) // 등록:[]
        }

    },[roomIdList, roomId, other, user])

    const onRemove = useCallback(
        id => {
            setRoomIdList(roomIdList.filter(room => room.id !== id))
            console.log(roomIdList)
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
        console.log("userReady")
        startFinding();
    })

    
        socket.on("roomReady", function(data){
            stopFinding()
            console.log(data)
            var roomId = data.roomId

            var other = data.users.filter((nick) => nick !== localStorage.getItem("user"))[0]
            console.log("user : " + user)
            console.log("other : " + other)
            roomplus({roomId, other})
            socket.emit("infoSetting",{nick:other,roomId:roomId})
        })
    
       

    socket.on("infoReady",function(data){
        console.log("infoReady")
        console.log(data)
        setOtherIntro(data.introduce)
    })

        socket.on("sysMsg",(data)=>{
            setSysMsg(data.message)
            console.log(data.message)
        })


    // const disconnect = () =>{
    //     socket.disconnect()
    //     onRemove(roomId)
    // }
    
    const MatchGender = (matchgender) =>{
        match = matchgender
        console.log(match)
    }

    const [delay, setDelay]= useState(null)

    const startFinding = ()=>{
        setDelay(1000)
        console.log("startFinding")
    }

    const stopFinding = () =>{ 
        setDelay(null)
        setLoading(false)
        socket.emit("userRelease", {nick:user});
        console.log("취소")
    }

    useEffect(()=>{
        let count =0
        if(delay !== null){
            let id = setInterval(function(){
                socket.emit("roomSetting", {nick:user})
                console.log(count+1)
                console.log("startFinding")
            }, delay)
            return() => clearInterval(id)
        }
    },[delay])

    // const [chatMsg, setChatMsg] = useState({message : ""})

    // const {message} = chatMsg

    // const onChatChange = e =>{
    //     setChatMsg({...chatMsg, [e.target.name]: e.target.value})
    // }

    // const [chatMsgList, setChatMsgList] = useState([])

    // const onChatSubmit = (e) =>{
    //     e.preventDefault()
   
    //     console.log({roomId: roomId, message: message, nick: user})

    //     if(!message){
    //         alert("대화내용을 입력해주세요")
    //         return
    //     }

    //     console.log(message)
    //     socket.emit("message", {roomId: 1645097870218, message:message, nick: "1234"})
    //     setChatMsg({message : ""})  
    // }
    // useEffect(()=>{
    //     socket.on("msg", (data) =>{
    //         setChatMsgList(chatMsgList.concat(data))
    //         console.log(chatMsgList)
    //         console.log(data)
    //         console.log(2);
    //     })
    // })
    // console.log(socket)
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
            
            userSetting={userSetting}
            loading={loading}
        
            MatchGender={MatchGender}

            onRemove={onRemove}
            onToggle={onToggle}

            // message={message}
            // onChatChange={onChatChange}
            // onChatSubmit={onChatSubmit}
        />    
    );
}


export default React.memo(MainForm);