import React, { useEffect, useState } from 'react';
import ChatForm from "../../components/chat/ChatForm"
import io from "socket.io-client";
import client from '../../lib/api/client';

const socket = io.connect(
    'http://ec2-13-124-41-101.ap-northeast-2.compute.amazonaws.com:5000/chatting'
)

const ChatPageForm = () =>{
    
    var handle = null
    const [user, setUser] = useState("")
    const [gender, setGender] = useState("")
    const [roomId, setRoomId ] = useState("")
    const [introduce, setIntro] = useState("")
    const [loading, setLoading] = useState(false)
    const [sysmsg, setSysMsg] = useState("")
    var match = ''
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

    const data ={
        nick:user,
        gender:gender
    }

    
    // 남, 녀 버튼 클릭 시
    const matching = () =>{
        socket.emit("findChat",{nick: user, gender: gender})
        startFinding();
        console.log("findchat")
    }
    // $("#matching").on("click", () => { ///333
    //     $("#chat").html("").append("<li>대화상대를 찾고있습니다...</li>");
    //     startFinding(); //실제로 대화상대찾기 시작
    // })

    socket.on("Error", (result)=>{
        alert(result)
        console.log(result)
    })

    socket.on("userFinding",(e)=>{
        console.log(e)
        // startFinding();
        setLoading(true)
        // setSysMsg(msg)
    })
    // socket.on("userFinding",function(){ //222
    //     $("#chatBox").removeClass("chatDisabled").addClass("chatabled");
    //     $("#nickNameForm").css("display","none");
    //     $("#sendMessage").hide(); $("#closing").hide();
    // });

    socket.on("userMatchingComplete", (data) => {
        stopFinding();
        console.log("찾았다!!")
        console.log(data)
        setRoomId(data.roomId)
    })
    // socket.on("userMatchingComplete",function(data){    //444
    //     stopFinding(); //찾는걸 성공했으니 찾는걸 멈춰야댐.
    //     $("#chat").html("").append("<li><p>대화방에 입장했습니다!!</p><hr></li>");
    //     $("#sendMessage").show(); $("#closing").show();
    //     $("matching").hide();
    //     roomName = data.roomId;
    // });

    // cancel 버튼 클릭 시
    const stopUserFinding = () => {
        stopFinding();
        console.log("cancel")
    }
    
    const startFinding = () =>{
        if(handle == null){
            handle = setInterval(()=>{
                socket.emit("randomChatFinding",{nick: user, match_gender:match})
                console.log({nick: user, match_gender:match})
                console.log("찾는")
            }, 1000)
        }
    }

    const stopFinding = () => {
        clearInterval(handle)
        handle = null
        socket.emit("stopUserFinding", {nick:user});
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
    //     $("#chat").append(data.message);
    // });
    
    socket.on("message", (message)=>{
        setSysMsg(message)
    })
    
    

    const disconnect = () =>{
        socket.emit("chatClosingBtn",{roomId:roomId});
        socket.emit("ChatClosing",{roomId:roomId});
    }
    
    // $("#closing").on("click",function(){
    //     socket.emit("chatClosingBtn",{roomId:roomName});
    //     $("#chat").append("<li><p>대화방이 종료되었습니다</p><hr></li>");
    //     $("#sendMessage").hide(); $("#closing").hide();
    //     socket.emit("ChatClosing",{roomId:roomName});
    //     $("#chatBox").removeClass("chatabled").addClass("chatDisabled");
    //     $("#nickNameForm").css("display","block");
    // })

    socket.on("sysMsg", (data)=>{
        setSysMsg(data.message)
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
            findChat={matching}
            loading={loading}


            MatchGender={Match_Gender}
        />    
    );
}

export default ChatPageForm;