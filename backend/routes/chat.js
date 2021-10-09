const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const pool = require("../middleware/pool");
const timer = ms => new Promise(res => setTimeout(res, ms));

router.get("/:roomId", validate.isLoggedin, async (req, res) => {
	let con1 = await pool.getConnection(async (conn) => conn);

	try {
		con1.beginTransaction();
		const other = con1.query("SELECT * FROM Users WHERE email = ?", [ req.body.other ]);
		res.status(200).json({
			msg: "Success",
			nickname: other[0][0].nickname,
			introduce: other[0][0].introduce,
			gender: other[0][0].gender
		})
		con1.commit();
	} catch (e) {
		con1.rollback();
		throw e;
	} finally {
		con1.release();
	}
})

router.post("/:roomId", validate.isLoggedin, async (req, res) => {
	let con1 = await pool.getConnection(async (conn) => conn);

	try {
		con1.beginTransaction();
		const chat = await con1.query("INSERT INTO Chats(user, roomId, message) VALUES(?, ?, ?)", [
			req.decoded.nick,
			req.body.roomId,
			req.body.message,
		]);
		con1.commit();
		console.log(chat);
		req.app.get('io').to(req.body.roomId).emit('message', chat);
		res.status(200).send({ result: true });
	} catch (e) {
		con1.rollback();
		throw e;
	} finally {
		con1.release();
	}
})

router.post("/", validate.isLoggedin, async function (req, res) {
    let con1 = await pool.getConnection(async (conn) => conn);

    try {
        con1.beginTransaction();
        const user = await con1.query("SELECT * FROM users WHERE email = ? ", [ // 유저 찾기
			req.decoded.email,
        ]);

        await con1.query("INSERT INTO ?(user) VALUES(?)", [ // Wating list 올려놓기
            "Wating_" + user[0][0].gender,
            user[0][0].email,
        ]);

		console.log(req.body.match_gender);

		do { // Wating 테이블에서 매칭상대 찾기  AND SLEEP(1)=0
			var match_user = await con1.query("SELECT * FROM ? WHERE user NOT IN (?) AND is_matching is true ORDER BY id LIMIT 1", [
				"Wating_" + req.body.match_gender,
				user[0][0].email
			]);
		} while (match_user[0][0] === undefined)

		await con1.query("UPDATE ? SET is_matching = true WHERE user = ?", [ // 매칭 상대 is_matching = true로 바꾸기
			"Wating_" + req.body.match_gender,
			match_user[0][0].user
		]);

		do { // Wating 테이블에서 본인꺼 is_matching이 바뀐지 확인
			var change_user = await con1.query("SELECT * FROM ? WHERE user = ? ", [
				"Wating_" + user[0][0].gender,
				user[0][0].email
			]);
			console.log(change_user[0][0].is_matching);
		} while (change_user[0][0].is_matching == false)

		if (match_user[0][0]) {
			await con1.query("DELETE FROM ? WHERE user = ?", [ // Wating 테이블에서 본인 삭제
				"Wating_" + user[0][0].gender,
				user[0][0].email
			])

			var roomId = user[0][0].email > match_user[0][0].user ? user[0][0].email : match_user[0][0].user;
			res.status(200).json({ result: true, roomId: roomId, other: match_user[0][0].user });
		}
		con1.commit();

    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

router.get("/", validate.isLoggedin, async function (req, res) {
    var email = req.decoded.email;
    let con1 = await pool.getConnection(async (conn) => conn);
    try {
        con1.beginTransaction();
        const db = await con1.query("SELECT * FROM users WHERE email = ?", [
            email,
        ]);
        if (db[0][0]) {
            res.status(200).json({
                msg: "Success",
                nickname: db[0][0].nickname,
                introduce: db[0][0].introduce,
				gender: db[0][0].gender
            });
        }
    } catch (e) {
        throw e;
    } finally {
        con1.release();
    }
});

module.exports = router;
