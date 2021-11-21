const redis = require("socket.io-redis");
const router = require("../routes/auth");

var clients = [];

module.exports = (io) => {
    io.adapter(redis({ host: "localhost", port: 6379 }));

    io.on("connection", (socket) => {
        socket.on("findChat", (data) => {
            if (!data.nick) {
                socket.emit("Error", "닉네임이 없습니다.");
                return;
            }
            for (var i = 0; i < clients.length; i++) {
                if (clients[i].nick == data.name) {
                    socket.emit("Error", "이미 대화상대를 찾는 중입니다.");
                    return;
                }
            }
            clients.push({
                nick: data.nick, // 사용자 닉네임
                client: socket, // 사용자의 소켓
                gender: data.gender,
            });
            socket.emit("userFinding"); // 로딩화면용
        });

        socket.on("stopUserFinding", (data) => {
            for (var i = 0; i < clients.length; i++) {
                if (clients[i].nick == data.nick) {
                    clients.splice(i, 1);
                    return;
                }
            }
        });

        socket.on("randomChatFinding", (data) => {
            for (var i = 0; i < clients.length; i++) {
                if (clients[i].nick == data.nick) {
                    continue;
                } else if (clients[i].gender == data.match_gender) {
                    var roomId = new Date().getTime() + "";
                    clients[i].client.join(roomId);
                    io.sockets.to(roomId).emit("userMatchingComplete", {
                        roomId: roomId,
                        other: clients[i].nick,
                    });
                    io.socket.to(roomId).emit("sysMsg", {
                        message: `${clients[i].nick}님이 입장하셨습니다.`,
                    });
                    clients.splice(i, 1);
                    return;
                }
            }
        });

        socket.on("message", (data) => {
            io.sockets.to(data.roomId).emit("message", {
                message: data.message,
            });
        });

        socket.on("disconnect", (data) => {
            io.sockets.to(data.roomId).emit("sysMsg", {
                message: `${data.nick}님이 퇴장하셨습니다.`,
            });
            socket.leave(data.roomId);
            console.log("room 접속 해제ㅠㅠ");
        });
    });
};
