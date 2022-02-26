/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import ChatPage from "../../components/Chat/ChatPage";
import { withRouter } from "react-router-dom";

const ChatForm = ({ info, socket }) => {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState("");
  const [other, setOther] = useState("");
  const [otherIntro, setOtherIntro] = useState("");
  const [roomId, setRoomID] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setUser(info.user);
    setOther(info.other);
    setOtherIntro(info.otherIntro);
    setRoomID(info.roomId);
    setImage(info.image);

    info && localStorage.setItem("infomation", JSON.stringify(info));
  }, []);

  const [sysMsg, setSysMsg] = useState("");
  const [chatMsg, setChatMsg] = useState({ message: "" });

  const { message } = chatMsg;

  const onChatChange = (e) => {
    setChatMsg({ ...chatMsg, [e.target.name]: e.target.value });
  };

  const onChatSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      alert("대화내용을 입력해주세요");
      return;
    }
    socket.emit("message", { roomId: roomId, message: message, nick: user });
    setChatMsg({ message: "" });
  };

  const [chatMsgList, setChatMsgList] = useState([]);

  useEffect(() => {
    socket.on("msg", (data) => {
      setChatMsgList((chatMsgList) => [...chatMsgList, data]);
    });

    socket.on("sysMsg", (data) => {
      setSysMsg(data.message);
      alert(data);
      console.log(data)
    });

    return () => {};
  }, [socket]);

  const ban = () => {
    socket.emit("ban", { roomId: roomId, user: user, other: other });
    socket.on("banComplete", () => {
      alert(`${other}가 차단되었습니다.`);
      socket.disconnect();
    });
  };

  useEffect(() => {
    setUserList(JSON.parse(localStorage.getItem("roomIdList")));
  }, []);

  const onListRemove = useCallback(
    (id) => {
      setUserList(userList.filter((user) => user.id !== id));
      localStorage.setItem(
        "roomIdList",
        JSON.stringify(userList.filter((room) => room.id !== id))
      );
      socket.disconnect();
    },
    [userList]
  );

  return (
    <ChatPage
      userList={userList}
      socket={socket}
      user={user}
      other={other}
      otherIntro={otherIntro}
      roomId={roomId}
      image={image}
      sysMsg={sysMsg}
      message={message}
      chatMsgList={chatMsgList}
      onListRemove={onListRemove}
      onChatChange={onChatChange}
      onChatSubmit={onChatSubmit}
      ban={ban}
    />
  );
};

export default withRouter(ChatForm);
