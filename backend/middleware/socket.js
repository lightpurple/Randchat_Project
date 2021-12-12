const SocketIO = require("socket.io");

//const redis = require("socket.io-redis");
var clients = [];
const waiting = 0;
const finding = 1;

module.exports = (server) => {
    const io = SocketIO(server, { cors: { origin: "http://localhost:3000" } });
    //io.adapter(redis({ host: "localhost", port: 6379 }));
    process.setMaxListeners(0);
    io.on("connection", (socket) => {
        console.log("커넥션 성공!");
        socket.on("findChat", (data) => {
            if (!data.nick) {
                socket.emit("Error", "닉네임이 없습니다.");
                return;
            }
            for (var i = 0; i < clients.length; i++) {
                if (clients[i].nick == data.nick) {
                    socket.emit("Error", "이미 대화상대를 찾는 중입니다.");
                    return;
                }
            }
            clients.push({
                nick: data.nick, // 사용자 닉네임
                client: socket, // 사용자의 소켓
                gender: data.gender,
                status: finding,
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
                if (clients[i].status === finding) {
                    if (clients[i].nick == data.nick) {
                        continue;
                    } else if (clients[i].gender == data.match_gender) {
                        var roomId = new Date().getTime() + "";
                        clients[i].status = waiting;
                        clients[i].client.join(roomId);
                        for (var j = 0; j < clients.length; j++) {
                            if (clients[j].nick == data.nick) {
                                clients[j].status = waiting;
                                clients[j].client.join(roomId);
                            }
                        }
                        io.to(roomId).emit("userMatchingComplete", {
                            roomId: roomId,
                        });
                        io.to(roomId).emit("sysMsg", {
                            message: "대화방에 입장하셨습니다!!",
                        });
                        return;
                    }
                }
            }
        });

        socket.on("message", (data) => {
            socket.to(data.roomId).emit("message", {
                message: data.message,
            });
        });

        socket.on("disconnect", (data) => {
            socket.to(data.roomId).emit("sysMsg", {
                message: `${data.nick}님이 퇴장하셨습니다.`,
            });
            socket.leave(data.roomId);
            console.log("room 접속 해제ㅠㅠ");
        });
    });
};
