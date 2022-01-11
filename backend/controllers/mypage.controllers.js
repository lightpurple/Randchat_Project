// 인증
import bcrypt from "bcryptjs";
const { hash, compare } = bcrypt;

// DB
import pool from "../middleware/pool.js";

export default {
  changePasswd: async (req, res, next) => {
    let con1 = await pool.getConnection(async (conn) => conn);

    try {
      const db = await pool.query("SELECT password FROM Users WHERE id = ?", [
        req.decoded.id,
      ]);
      if (db[0][0]) {
        compare(req.body.old_password, db[0][0].password, (err, result) => {
          if (!result) {
            res.status(400).json({
              msg: "Old Password is incorrect!",
            });
          } else {
            hash(req.body.new_password, 10, async (err, hash) => {
              if (err) {
                throw err;
              } else {
                try {
                  con1.beginTransaction();
                  await con1.query(
                    "UPDATE Users SET password = ? WHERE id = ?",
                    [hash, req.decoded.id]
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
            });
          }
        });
      } else {
        res.status(400).send({ msg: "User Not Exist!" });
      }
    } catch (e) {
      throw e;
    } finally {
      con1.release();
    }
  },
  myPageShow: async (req, res, next) => {
    try {
      const User = await pool.query(
        "SELECT email, nickname, introduce, image FROM Users WHERE id = ?",
        req.decoded.id
      );
      return res.status(200).json({
        email: User[0][0].email,
        nickname: User[0][0].nickname,
        introduce: User[0][0].introduce,
        image: User[0][0].image,
      });
    } catch (e) {
      throw e;
    }
  },
  myPagePut: async (req, res, next) => {
    let con1 = pool.getConnection(async (conn) => conn);
    try {
      (await con1).beginTransaction();
      (await con1).query(
        "UPDATE Users SET nickname = ?, introduce = ? WHERE id = ?",
        [req.body.nickname, req.body.introduce, req.decoded.id]
      );
      (await con1).commit();
      res.status(200).json({
        result: true,
        msg: "User update successful!",
      });
    } catch (e) {
      (await con1).rollback();
      throw e;
    } finally {
      (await con1).release();
    }
  },
  myPageDelete: async (req, res, next) => {
    let con1 = pool.getConnection(async (conn) => conn);

    try {
      const User = await pool.query("SELECT password FROM Users WHERE id = ?", [
        req.decoded.id,
      ]);

      if (User[0][0]) {
        compare(req.body.password, User[0][0].password, async (err, result) => {
          if (!result) {
            res.status(400).json({
              result: false,
              msg: "Password is incorrect!",
            });
          } else {
            (await con1).beginTransaction;
            (await con1).query("DELETE FROM Users WHERE id = ?", [
              req.decoded.id,
            ]);
            (await con1).commit();
            res.status(200).json({
              msg: "User delete complete! ",
            });
          }
        });
      } else {
        res.status(400).send({ msg: "User Not Exist!" });
      }
    } catch (e) {
      (await con1).rollback();
      throw e;
    } finally {
      (await con1).release();
    }
  },
  uploadProfile: async (req, res, next) => {
    const con1 = pool.getConnection(async (conn) => conn);
    try {
      console.log(req.file.location);
      (await con1).beginTransaction();
      (await con1).query("UPDATE Users SET image = ? WHERE id = ?", [
        req.file.location,
        req.decoded.id,
      ]);
      res.status(200).json({
        msg: "Image upload successful!",
      });
    } catch (e) {
      (await con1).rollback();
      throw e;
    } finally {
      (await con1).release();
    }
  },
};
