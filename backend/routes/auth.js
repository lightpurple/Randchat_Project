const express = require('express');
const router = express.Router();

// 인증
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate = require('../middleware/validate');

// DB
const pool = require('../middleware/pool');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * definitions:
 *  User:
 *   type: object
 *   required:
 *     - id
 *     - email
 *     - gender
 *     - password
 *   properties:
 *     id:
 *       type: integer
 *       description: ObjectId
 *     email:
 *       type: string
 *       description: 유저 이메일 겸 로그인 아이디
 *     gender:
 *       type: string
 *       description: 유저 성별
 *     password:
 *       type: string
 *       description: 유저 비밀번호
 */

/**
 * @swagger
 * path:
 *  /signup:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *       "200":
 *        description: 회원가입 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
 router.post('/signup', validate.validateRegister, async (req, res) => {
    let con1 = await pool.getConnection(async (conn) => conn);

    try { // DB에 email, nickname이 겹치는 user가 있는지 확인
        const same_email = await pool.query(
            "SELECT * FROM Users WHERE email = ?",
            req.body.email
        );
        const same_nick = await pool.query(
            "SELECT * FROM Users WHERE nickname = ?",
            req.body.nickname
        );
        if (same_email[0][0] !== undefined || same_nick[0][0] !== undefined) {
            return res.status(400).json({
                result: false,
                msg: "User is aleady exist!",
            });
        }
    } catch (e) {
        throw e;
    }
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            throw err;
        } else {
            try {
                con1.beginTransaction();
                await con1.query(
                    "INSERT INTO Users(email, nickname, gender, password) VALUES(?, ?, ?, ?)",
                    [req.body.email, req.body.nickname, req.body.gender, hash]
                );
                con1.commit();
                res.status(200).json({ result: true, msg: "Success" });
            } catch (e) {
                con1.rollback();
                throw e;
            } finally {
                con1.release();
            }
        }
    });
});

router.post("/login", async (req, res) => {
    try {
        // email로 유저 검색
        const User = await pool.query("SELECT * FROM Users WHERE email = ?", [ req.body.email ]);
        if (!User[0][0]) { // 유저가 존재하지 않을 경우
            res.status(400).json({result: false, msg: "User does not exist!" })
        } else {
            // hash로 암호화된 password를 req로 들어온 password와 비교
            bcrypt.compare(req.body.password, User[0][0].password, (err, result) => {
                if (!result){
                    res.status(400).json({result: false, msg: "Password is incorrect!"});
                } else {
                    jwt.sign({ // 토큰에 담는 정보
                    	email: User[0][0].email,
                        nick: User[0][0].nickname,
                    },
                        process.env.JWT_SECRET,
                        { expiresIn: 60 * 60 * 24 * 15 }, // 토큰 만료 기간 15일
                        (err, token) => {
                            if (err) {throw err;}
                            res.status(200).json({
								msg : "Success",
								token : token
							});
                        }
		    );
                }
            });
        }
    } catch (e) {
        throw e;
    }
});

router.post('/mypage/change_password', validate.isLoggedin, async function(req, res) {
	let con1 = await pool.getConnection(async conn => conn)

	try {
		con1.beginTransaction()
		const db = await con1.query('SELECT * FROM Users WHERE email = ?',[req.decoded.email]);
		if (db[0][0]) {
			bcrypt.compare(req.body.old_password, db[0][0].password, function(err, result) {
				if (!result) {
					res.status(400).json({ msg: "Old Password is incorrect!" })
				} else {
					bcrypt.hash(req.body.new_password, 10, async (err, hash) => {
						if (err) {
							throw err;
						} else {
							try {
								await con1.query('UPDATE Users SET password = ? WHERE email = ?',
								[hash, req.body.email])
								con1.commit()
								res.status(200).send({
									msg: "Password change successful!"
								});
							} catch (e) {
								throw e;
							}
						}})
				}
			})
		}
	} catch (e) {
		throw e;
	} finally {
		con1.release()
	}
})

router.get('/mypage', validate.isLoggedin, async (req, res) => {
	try {
		const User = await pool.query("SELECT * FROM Users WHERE email = ?", req.decoded.email);
		return res.status(200).json({
			email: User[0][0].email,
			nickname: User[0][0].nickname,
			introduce: User[0][0].introduce
		});
	} catch (e) {
		throw e;
	}
});

router.put('/mypage', validate.isLoggedin, async (req, res) => {
	let con1 = await pool.getConnection(async (conn) => conn);
	try {
		con1.beginTransaction();
		await con1.query('UPDATE Users SET nickname = ?, introduce = ? WHERE email = ?',
		[req.body.nickname, req.body.introduce, req.decoded.email]);
		con1.commit();
		res.status(200).json({ result: true, msg: "User update successful!"});
	} catch (e) {
		con1.rollback();
		throw e;
	} finally {
		con1.release();
	}
})

router.delete('/mypage', validate.isLoggedin, async (req, res) => {
	let con1 = await pool.getConnection(async conn => conn)

	try {
		con1.beginTransaction();
		const User = await con1.query('SELECT * FROM Users WHERE email = ?', [req.decoded.email]);
		bcrypt.compare(req.body.password, User[0][0].password, async (err, result) => {
			if (!result){
				res.status(400).json({result: false, msg: "Password is incorrect!"});
			} else {
				await con1.query('DELETE FROM Users WHERE email = ?', [req.decoded.email]);
				con1.commit();
				res.status(200).json({ msg: 'User delete complete! '});
			}
		})
	} catch (e) {
		con1.rollback();
		throw e;
	} finally {
		con1.release();
	}
})



module.exports = router;
