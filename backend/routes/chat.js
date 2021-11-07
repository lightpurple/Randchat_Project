const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const pool = require("../middleware/pool");

router.post("/", validate.isLoggedin, async function (req, res) {
    var email = req.decoded.email;
    let con1 = await pool.getConnection(async (conn) => conn);

    try {
        con1.beginTransaction();
        const user = await con1.query("SELECT * FROM users WHERE email = ? ", [ // 유저 찾기
            email,
        ]);

        await con1.query("INSERT INTO ?(user) VALUES(?)", [ // Wating list 올려놓기
            "Wating_" + user[0][0].gender,
            user[0][0].email,
        ]);

        const match_user = await con1.query("SELECT * FROM ? WHERE user NOT IN (?) AND SLEEP(2)=0 ORDER BY id LIMIT 1", [ // Wating 테이블에서 매칭상대 찾기
			"Wating_" + user[0][0].match_gender,
			user[0][0].email
		]);


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
            });
        }
    } catch (e) {
        throw e;
    } finally {
        con1.release();
    }
});

module.exports = router;
