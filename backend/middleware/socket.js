module.exports = (io) => {

    io.on("connection", (socket) => {
		const req = socket.request;

		console.log("커넥션 성공!");
        console.log(req.body);
        console.log("------------------------------------");

		socket.on("joinRoom", (data) => {
			socket.join(data.roomId);
			io.to(roomId).emit("sysMsg", {
				message: `${data.user}님이 입장하셨습니다.`,
			});
		})
		// 클라이언트 처음에 emit("joinRoom", data) data = { roomId : ??, user : ?? }
		// 클라이언트에서 만들어야할 이벤트리스너
		// => sysMsg, message
		// message emit 시 data = { message : ??, user : ?? }
        socket.on("disconnect", (data) => {
            io.to(data.roomId).emit("sysMsg", {
                message: `${req.decoded.nick}님이 퇴장하셨습니다.`,
            });
			socket.leave(data.roomId);
            console.log("room 접속 해제ㅠㅠ");
        });

		socket.on("message", (data) => {
			io.to(data.roomId).emit("message", {
				user: data.user,
				message: data.message,
			})
		});
    });
};
