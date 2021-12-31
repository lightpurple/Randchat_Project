import React, { useEffect, useState } from 'react';
import ChatForm from "../../components/chat/ChatForm"
import io from "socket.io-client";
import client from '../../lib/api/client';

const ENDPOINT = "http://ec2-13-124-41-101.ap-northeast-2.compute.amazonaws.com:5000"

const socket = io.connect(ENDPOINT)

const ChatPageForm = () =>{

    var handle = null
    const [user, setUser] = useState("")        // nick
    const [gender, setGender] = useState("")    // gender
    const [roomId, setRoomId ] = useState("")   // roomid
    const [other, setOther] = useState("")      // other
    const [introduce, setIntro] = useState("")  // introduce
    const [loading, setLoading] = useState(false)   // Loading
    const [sysmsg, setSysMsg] = useState("")    // 서비스 메세지
    var match = ''  // match_gender
    
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
    }

    // Error시 알람 띄우기
    socket.on("Error", (result)=>{
        alert(result)
        console.log(result)
    })
    // userFinding
    socket.on("userFinding", function(){
        setLoading(true);
        startFinding();
    })

    // cancel 버튼 클릭 시
    const stopUserFinding = () => {
        stopFinding();
        console.log("cancel")
    }

    
    
    socket.on("userMatchingComplete", function(data){
        stopFinding()
    //     $("#chat").html("").append("<li><p>대화방에 입장했습니다!!</p><hr></li>");
    //     $("#sendMessage").show(); $("#closing").show();
    //     $("matching").hide();
        setRoomId(data.roomId)
        setOther(data.other)
        console.log(data)
    })

    socket.on("sysMsg", (data)=>{
        setSysMsg(data.message)
        console.log(data)
    })

    

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
        // setSysMsg("대화방이 종료되었습니다")
//     $("#chat").append("<li><p>대화방이 종료되었습니다</p><hr></li>");
//     $("#sendMessage").hide(); $("#closing").hide();
        socket.emit("ChatClosing",{roomId: roomId})
        
    // $("#chatBox").removeClass("chatabled").addClass("chatDisabled");
//     $("#nickNameForm").css("display","block");
    }

    
    function startFinding(){
        if(handle == null){
            handle = setInterval(function(){
                socket.emit("randomChatFinding",{nick: user, match_gender:match})
                console.log({nick: user, match_gender:match})
                console.log("찾는")
            }, 10000)
        }
    }

    function stopFinding(){
        clearInterval(handle)
        handle = null
        socket.emit("stopUserFinding", {nick:user}); // 서버에 있는 대기열에서 nick 삭제
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
            
            cancel={stopUserFinding}
            
            introduce={introduce}
            sysmsg={sysmsg}
            other={other}
            data={data}
            
            findChat={findChat}
            loading={loading}


            MatchGender={Match_Gender}
        />    
    );
}

export default ChatPageForm;