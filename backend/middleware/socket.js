import { Server } from "socket.io";
import Chat from "../controllers/chat.controllers.js";

//const redis = require("socket.io-redis");
var clients = [];
const waiting = 0;
const finding = 1;

const newUser = (nick, client, gender, status, banList) => {
  this.nick = nick;
  this.client = client;
  this.gender = gender;
  this.status = status;
  this.banList = banList;
};

export default (server) => {
  const io = new Server(server, {
    cors: { origin: "http://localhost:3000" },
  });
  //io.adapter(redis({ host: "localhost", port: 6379 }));
  process.setMaxListeners(0);
  io.on("connection", (socket) => {
    console.log("커넥션 성공");
    socket.on("findChat", async (data) => {
      console.log("findChat 이벤트 호출");
      if (!data.nick) {
        socket.emit("Error", "닉네임이 없습니다.");
        return;
      }
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].nick === data.nick) {
          socket.emit("Error", "이미 대화상대를 찾는 중입니다.");
          return;
        }
      }
      const banList = await Chat.getBanUser(data.nick); // 유저 밴 목록 가져오기
      const newUser = new newUser(
        data.nick,
        socket,
        data.gender,
        finding,
        banList
      );
      clients.push(newUser);
      socket.emit("userFinding"); // 로딩화면용
    });

    socket.on("stopUserFinding", (data) => {
      for (let i in clients) {
        if (clients[i].nick === data.nick) {
          clients.splice(i, 1);
          return;
        }
      }
    });

    socket.on("randomChatFinding", (data) => {
      for (let user of clients) {
        if (user.nick === data.nick) {
          // data.nick 찾기
          for (let other of clients) {
            if (
              user.nick !== other.nick &&
              user.banList.indexOf(other.nick) === -1
            ) {
              // user.banList에 없는 other 찾기
              const roomId = new Date.now();
              const users = [user.nick, other.nick];
              user.status = waiting;
              other.status = waiting;
              user.client.join(roomId);
              other.client.join(roomId);
              io.to(roomId).emit("userMatchingComplete", {
                roomId: roomId,
                users: users,
              });
              io.to(roomId).emit("sysMsg", {
                message: "대화방에 입장하셨습니다!!",
              });
              console.log("유저매칭 성공");
              return;
            }
          }
        }
      }
    });

    socket.on("getIntroduce", async (data) => {
      const Info = await Chat.getInfo(data.nick);
      socket.to(data.roomId).emit("showIntroduce", {
        introduce: Info.introduce,
        image: Info.image,
      });
      console.log("introduce 보내기 성공");
    });

    socket.on("message", (data) => {
      socket.to(data.roomId).emit("message", {
        message: data.message,
        nick: data.nick,
      });
    });

    socket.on("ban", async (data) => {
      await Chat.putBanUser(data.user, data.other);
      socket.to(data.roomId).emit("banComplete");
    });

    socket.on("disconnect", (data) => {
      socket.to(data.roomId).emit("sysMsg", {
        message: `${data.nick}님이 퇴장하셨습니다.`,
      });
      socket.leave(data.roomId);
      console.log("room 접속 해제");
    });
  });
};
