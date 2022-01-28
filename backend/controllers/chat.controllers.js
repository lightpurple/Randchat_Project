import pool from "../middleware/pool.js";

export default {
  chatGet: async (req, res) => {
    try {
      let db = await pool.query(
        "SELECT nickname, introduce, gender FROM Users WHERE id = ?",
        [req.decoded.id]
      );
      db = db[0][0];
      if (db) {
        res.status(200).json({
          result: true,
          nickname: db.nickname,
          introduce: db.introduce,
          gender: db.gender,
        });
      }
    } catch (e) {
      throw e;
    }
  },
  getInfo: async (nick) => {
    try {
      let userInfo = await pool.query(
        "SELECT introduce,image FROM Users WHERE nickname = ?",
        [nick]
      );
      userInfo = userInfo[0][0];
      return {
        introduce: userInfo.introduce,
        image: userInfo.image,
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
        let banNick = await pool.query(
          "select nickname from Users where id=?",
          ban[0][id].ban_id
        );
        banList.push(banNick[0][0].nickname);
      }
      return banList;
    } catch (e) {
      throw e;
    }
  },
  newUser: function (nick, client, gender, matchGender, status, banList) {
    this.nick = nick;
    this.client = client;
    this.gender = gender;
    this.matchGender = matchGender;
    this.status = status;
    this.banList = banList;
  },
  matchCondition: (user, other) => {
    if (
      user.nick !== other.nick &&
      user.banList.indexOf(other.nick) === -1 &&
      other.banList.indexOf(user.nick) === -1 &&
      user.gender === other.matchGender &&
      user.matchGender === other.gender
    ) {
      return true;
    } else {
      return false;
    }
  },
};
