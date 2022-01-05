// 인증
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const { hash, compare } = bcrypt;
const { sign } = jwt;

// DB
import pool from "../middleware/pool.js";

export default {
  signUp: async (req, res, next) => {
    let con1 = pool.getConnection(async (conn) => conn);

    try {
      // DB에 email, nickname이 겹치는 user가 있는지 확인
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
    hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        throw err;
      } else {
        try {
          (await con1).beginTransaction();
          (await con1).query(
            "INSERT INTO Users(email, nickname, gender, password) VALUES(?, ?, ?, ?)",
            [req.body.email, req.body.nickname, req.body.gender, hash]
          );
          (await con1).commit();
          res.status(200).json({ result: true, msg: "Success" });
        } catch (e) {
          (await con1).rollback();
          throw e;
        } finally {
          (await con1).release();
        }
      }
    });
  },
  login: async (req, res, next) => {
    try {
      // email로 유저 검색
      const User = await pool.query("SELECT * FROM Users WHERE email = ?", [
        req.body.email,
      ]);
      if (!User[0][0]) {
        // 유저가 존재하지 않을 경우
        res.status(400).json({
          result: false,
          msg: "User does not exist!",
        });
      } else {
        // hash로 암호화된 password를 req로 들어온 password와 비교
        compare(req.body.password, User[0][0].password, (err, result) => {
          if (!result) {
            res.status(400).json({
              result: false,
              msg: "Password is incorrect!",
            });
          } else {
            sign(
              {
                // 토큰에 담는 정보
                email: User[0][0].email,
                nick: User[0][0].nickname,
              },
              process.env.JWT_SECRET,
              { expiresIn: 60 * 60 * 24 * 15 }, // 토큰 만료 기간 15일
              (err, token) => {
                if (err) {
                  throw err;
                }
                res.status(200).json({
                  msg: "Success",
                  token: token,
                });
              }
            );
          }
        });
      }
    } catch (e) {
      throw e;
    }
  },
};
