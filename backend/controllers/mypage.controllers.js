// 인증
import bcrypt from "bcryptjs";
const { hash, compare } = bcrypt;

// DB
import pool from "../middleware/pool.js";

export default {
    changePasswd: async (req, res, next) => {
        let con1 = pool.getConnection(async (conn) => conn);

        try {
            const db = pool.query("SELECT * FROM Users WHERE email = ?", [
                req.decoded.email,
            ]);
            if (db[0][0]) {
                compare(
                    req.body.old_password,
                    db[0][0].password,
                    function (err, result) {
                        if (!result) {
                            res.status(400).json({
                                msg: "Old Password is incorrect!",
                            });
                        } else {
                            hash(
                                req.body.new_password,
                                10,
                                async (err, hash) => {
                                    if (err) {
                                        throw err;
                                    } else {
                                        try {
                                            con1.beginTransaction();
                                            await con1.query(
                                                "UPDATE Users SET password = ? WHERE email = ?",
                                                [hash, req.body.email]
                                            );
                                            con1.commit();
                                            res.status(200).send({
                                                msg: "Password change successful!",
                                            });
                                        } catch (e) {
                                            con1.rollback();
                                            throw e;
                                        }
                                    }
                                }
                            );
                        }
                    }
                );
            }
        } catch (e) {
            throw e;
        } finally {
            con1.release();
        }
    },
    myPageShow: async (req, res, next) => {
        try {
            const User = pool.query(
                "SELECT * FROM Users WHERE email = ?",
                req.decoded.email
            );
            return res.status(200).json({
                email: User[0][0].email,
                nickname: User[0][0].nickname,
                introduce: User[0][0].introduce,
            });
        } catch (e) {
            throw e;
        }
    },
    myPagePut: async (req, res, next) => {
        let con1 = pool.getConnection(async (conn) => conn);
        try {
            con1.beginTransaction();
            await con1.query(
                "UPDATE Users SET nickname = ?, introduce = ? WHERE email = ?",
                [req.body.nickname, req.body.introduce, req.decoded.email]
            );
            con1.commit();
            res.status(200).json({
                result: true,
                msg: "User update successful!",
            });
        } catch (e) {
            con1.rollback();
            throw e;
        } finally {
            con1.release();
        }
    },
    myPageDelete: async (req, res, next) => {
        let con1 = pool.getConnection(async (conn) => conn);

        try {
            con1.beginTransaction();
            const User = await con1.query(
                "SELECT * FROM Users WHERE email = ?",
                [req.decoded.email]
            );
            compare(
                req.body.password,
                User[0][0].password,
                async (err, result) => {
                    if (!result) {
                        res.status(400).json({
                            result: false,
                            msg: "Password is incorrect!",
                        });
                    } else {
                        await con1.query("DELETE FROM Users WHERE email = ?", [
                            req.decoded.email,
                        ]);
                        con1.commit();
                        res.status(200).json({ msg: "User delete complete! " });
                    }
                }
            );
        } catch (e) {
            con1.rollback();
            throw e;
        } finally {
            con1.release();
        }
    },
};
