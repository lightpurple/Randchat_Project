import React, { useEffect, useState } from 'react';
import ChatForm from "../../components/chat/ChatForm"
// const io = require("socket.io-client");
import {  io } from "socket.io-client";
import client from '../../lib/api/client';


// const socket = io.connect("http://ec2-13-124-41-101.ap-northeast-2.compute.amazonaws.com:5000/", { transports: ['websocket'] });
//     (() => {
//         console.log("connection 성공")
//     })();

const socket = io("http://ec2-13-124-41-101.ap-northeast-2.compute.amazonaws.com:5000/");

console.log(socket.id)

socket.on("connect", () =>{
    console.log(socket.connected)
})

const ChatPageForm = () =>{
    
    

    var handle = null
    const [user, setUser] = useState("")        // nick
    const [gender, setGender] = useState("")    // gender
    const [roomId, setRoomId ] = useState("")   // roomid
    const [introduce, setIntro] = useState("")  // introduce
    const [loading, setLoading] = useState(false)   // Loading
    const [find, setFind] = useState(false)
    const [sysmsg, setSysMsg] = useState("")    // 서비스 메세지

    var match = ''  // match_gender
    

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
        
    },[])



    const data ={
        nick:user,
        gender:gender
    }

    
    // 남, 녀 버튼 클릭 시
    const findChat = () =>{
        socket.emit('findChat',null,{nick: user, gender: gender})
            console.log("findChat?")
            console.log({nick: user, gender: gender})
        // socket.on('connect', function(){
            
        // })
        // socket.emit("findChat",{nick: user, gender: gender})
        console.log("findchat")
        console.log({nick: user, gender: gender, match_gender: match})
    }

    socket.on("Error", (result)=>{
        alert(result)
        console.log(result)
    })


    socket.on("userFinding",function(){
    //     $("#chatBox").removeClass("chatDisabled").addClass("chatabled");
    //     $("#nickNameForm").css("display","none");
    //     $("#sendMessage").hide(); $("#closing").hide();
        setLoading(true)
    })

    socket.on("userMatchingComplete", function(data){
        stopFinding()
    //     $("#chat").html("").append("<li><p>대화방에 입장했습니다!!</p><hr></li>");
    //     $("#sendMessage").show(); $("#closing").show();
    //     $("matching").hide();
        setRoomId(data.roomId)
    })

    socket.on("sysMsg", (data)=>{
        setSysMsg(data.message)
    })

    const matching = () => {
        setFind(true)
        startFinding();
    }

    // $("#sendMessage").on("click",function(){
    //     var content = $("#content").val();
    //     if(!content){
    //         alert("대화내용을 입력해주세요");
    //         return ;
    //     }
    //     var str = "";
    //     str += "<li>";
    //     str += "<strong>"+nick+"</strong>";
    //     str += "<p>"+content+"</p>";
    //     str += "<hr>";
    //     str += "</li>";

    //     socket.emit("message",{roomId:roomName, message:str});
    //     $("#content").val("");
    //     $("#chat").scrollTop($("#chat")[0].scrollHeight);
    //     $("#chat").append(str);
    // });

    // socket.on("message",function(data){
    //     setSysMsg(message)
    //     $("#chat").append(data.message);
    // });
    

    function closing(){
        socket.emit("chatClosingBtn",{roomId: roomId})
//     $("#chat").append("<li><p>대화방이 종료되었습니다</p><hr></li>");
//     $("#sendMessage").hide(); $("#closing").hide();
        socket.emit("ChatClosing",{roomId: roomId})
    // $("#chatBox").removeClass("chatabled").addClass("chatDisabled");
//     $("#nickNameForm").css("display","block");
    }

    
    function startFinding(){
        if(handle == null){
            handle = setInterval(()=>{
                socket.emit("randomChatFinding",{nick: user, match_gender:match})
                console.log({nick: user, match_gender:match})
                console.log("찾는")
            }, 1000)
        }
    }

    function stopFinding(){
        clearInterval(handle)
        handle = null
        socket.emit("stopUserFinding", {nick:user});
        console.log("stopFinding")
        setFind(false)
    }
    

    const Match_Gender = (matchgender) =>{
        match = matchgender
    }
    return(
        <ChatForm 
            user={user}
            socket={socket}
            gender={gender}
            closing={closing}
            
            cancel={stopFinding}
            
            introduce={introduce}
            sysmsg={sysmsg}
            data={data}
            
            find={find}
            findChat={findChat}
            matching={matching}
            loading={loading}


            MatchGender={Match_Gender}
        />    
    );
}

export default ChatPageForm;