import pool from "../middleware/pool.js";

export default {
  chatGet: async (req, res) => {
    try {
      const db = await pool.query(
        "SELECT nickname, introduce, gender FROM Users WHERE id = ?",
        [req.decoded.id]
      );
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
    }
  },
  getInfo: async (nick) => {
    try {
      const userInfo = await pool.query(
        "SELECT introduce,image FROM Users WHERE nickname = ?",
        [nick]
      );
      return {
        introduce: userInfo[0][0].introduce,
        image: userInfo[0][0].image,
      };
    } catch (e) {
      throw e;
    }
  },
  putBanUser: async (user, other) => {
    let con1 = pool.getConnection(async (conn) => conn);
    try {
      // 유저검색
      const userId = await pool.query(
        "SELECT id FROM Users WHERE nickname = ?",
        [user]
      );
      // 밴할유저 검색
      const banId = await pool.query(
        "SELECT id FROM Users WHERE nickname = ?",
        [other]
      );
      // ban_list 업뎃
      (await con1).beginTransaction();
      (await con1).query("INSERT INTO Ban_list (id, ban_user) VALUES (?, ?);", [
        userId[0][0].id,
        banId[0][0].id,
      ]);
      (await con1).commit();
    } catch (e) {
      (await con1).rollback();
      throw e;
    } finally {
      (await con1).release();
    }
  },
  getBanUser: async (user) => {
    try {
      const banList = [];
      const ban = await pool.query(
        "select ban_id from Users right outer join Ban_list on Users.id=Ban_list.user_id where Users.nickname=?;",
        user
      );
      for (let id in ban[0]) {
        banList.push(ban[0][id].banId);
      }
      return banList;
    } catch (e) {
      throw e;
    }
  },
};
