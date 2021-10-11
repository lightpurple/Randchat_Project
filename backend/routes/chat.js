const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const validate = require("../middleware/validate");
const pool = require("../middleware/pool");
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

router.get("/:roomId", validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);

    try {
        con1.beginTransaction();
        const other = await con1.query("SELECT * FROM Users WHERE email = ?", [
            req.body.other,
        ]);
        res.status(200).json({
            result: true,
            nickname: other[0][0].nickname,
            introduce: other[0][0].introduce,
            gender: other[0][0].gender,
        });
        con1.commit();
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

router.post("/:roomId", validate.isLoggedin, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);

    try {
        con1.beginTransaction();
        await con1.query(
            "INSERT INTO Chats(user, roomId, message) VALUES(?, ?, ?)",
            [req.decoded.nick, req.body.roomId, req.body.message]
        );
        con1.commit();
        const chat = await con1.query(
            "SELECT * FROM Chats WHERE message = ? ORDER BY created_at DESC LIMIT 1",
            [req.body.message]
        );
        req.app.get("io").to(req.body.roomId).emit("message", chat[0][0]);
        res.status(200).send({ result: true });
    } catch (e) {
        con1.rollback();
        throw e;
    } finally {
        con1.release();
    }
});

router.post("/", validate.isLoggedin, async function (req, res) {
    let con1 = await pool.getConnection(async (conn) => conn);

    try {
        con1.beginTransaction();
        const user = await con1.query("SELECT * FROM Users WHERE email = ? ", [
            // 유저 찾기
            req.decoded.email,
        ]);

        // sql문 모음
        var sql_select_user = `SELECT * FROM Wating_${user[0][0].gender} WHERE user = ?`;
        var sql_select_match = `SELECT * FROM Wating_${req.body.match_gender} WHERE user NOT IN (?) AND is_matching is false ORDER BY id LIMIT 1`;
        var sql_insert_user = `INSERT INTO Wating_${user[0][0].gender}(user) VALUES (?)`;
        var sql_update_match = `UPDATE Wating_${req.body.match_gender} SET is_matching = true WHERE user = ?`;
        var sql_delete_user = `DELETE FROM Wating_${user[0][0].gender} WHERE user = ?`;

        await con1.query(sql_insert_user, user[0][0].email); // Wating list 올려놓기
        con1.commit();
        do {
            // Wating 테이블에서 매칭상대 찾기  AND SLEEP(1)=0
            var match_user = await con1.query(
                sql_select_match,
                user[0][0].email
            );
        } while (match_user[0][0] === undefined);

        await con1.query(sql_update_match, match_user[0][0].user); // Wating 테이블에서 상대 is_matching = ture
        con1.commit();

        do {
            // Wating 테이블에서 본인꺼 is_matching이 바뀐지 확인
            var change_user = await con1.query(
                sql_select_user,
                user[0][0].email
            );
        } while (change_user[0][0].is_matching == false);

        if (match_user[0][0]) {
            await con1.query(sql_delete_user, user[0][0].email); // Wating 테이블에서 본인 삭제

            var roomKey =
                user[0][0].email > match_user[0][0].user
                    ? user[0][0].email
                    : match_user[0][0].user;
            var roomId = 0;
            for (i = 0; i < roomKey.length; i++) {
                roomId += roomKey[i].charCodeAt(0);
            }
            res.status(200).json({
                result: true,
                roomId: roomId,
                other: match_user[0][0].user,
            });
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
        const db = await con1.query("SELECT * FROM Users WHERE email = ?", [
            email,
        ]);
        if (db[0][0]) {
            res.status(200).json({
                result: true,
                nickname: db[0][0].nickname,
                introduce: db[0][0].introduce,
                gender: db[0][0].gender,
            });
        }
    } catch (e) {
        throw e;
    } finally {
        con1.release();
    }
});

module.exports = router;
