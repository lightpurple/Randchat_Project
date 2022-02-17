import { Server } from "socket.io";
import Chat from "../controllers/chat.controllers.js";

//const redis = require("socket.io-redis");
var clients = [];
const waiting = 0;
const finding = 1;

export default (server) => {
  const io = new Server(server, {
    cors: { origin: "http://localhost:3000" },
  });
  //io.adapter(redis({ host: "localhost", port: 6379 }));
  io.sockets.setMaxListeners(0);
  io.on("connection", (socket) => {
    // let clientSocket = io.sockets.connected[user.socketId];
    socket.on("userSetting", async (data) => {
      if (!data.nick) {
        socket.emit("Error", "닉네임이 없습니다.");
        return;
      }
      for (let i in clients) {
        if (clients[i].nick === data.nick) {
          socket.emit("Error", "이미 대화상대를 찾는 중입니다.");
          return;
        }
      }
      const banList = await Chat.getBanUser(data.nick); // 유저 밴 목록 가져오기
      const newClient = new Chat.newUser(
        data.nick,
        socket,
        data.gender,
        data.matchGender,
        finding,
        banList
      );
      clients.push(newClient);
      socket.emit("userReady"); // 로딩화면용
    });

    socket.on("userRelease", (data) => {
      for (let i in clients) {
        if (clients[i].nick === data.nick) {
          clients.splice(i, 1);
          return;
        }
      }
    });

    socket.on("roomSetting", (data) => {
      // data.match_gender
      for (let user of clients) {
        // clients에서 user찾기
        if (user.nick === data.nick) {
          for (let other of clients) {
            if (Chat.matchCondition(user, other)) {
              const roomId = Date.now();
              const users = [user.nick, other.nick];
              user.status = waiting;
              other.status = waiting;
              user.client.join(roomId);
              other.client.join(roomId);
              io.to(roomId).emit("roomReady", {
                roomId: roomId,
                users: users,
              });
              io.to(roomId).emit("sysMsg", {
                message: "대화방에 입장하셨습니다!!",
              });
              return;
            }
          }
        }
      }
    });

    socket.on("infoSetting", async (data) => {
      const Info = await Chat.getInfo(data.nick);
      socket.to(data.roomId).emit("infoReady", {
        introduce: Info.introduce,
        image: Info.image,
      });
    });

    socket.on("message", (data) => {
      io.in(data.roomId).emit("message", {
        message: data.message,
        nick: data.nick,
      });
    });

    socket.on("ban", async (data) => {
      await Chat.putBanUser(data.user, data.other);
      socket.emit("banComplete");
    });

    socket.on("disconnect", (data) => {
      io.to(data.roomId).emit("sysMsg", {
        message: `${data.nick}님이 퇴장하셨습니다.`,
      });
      socket.leave(data.roomId);
    });
  });
};
