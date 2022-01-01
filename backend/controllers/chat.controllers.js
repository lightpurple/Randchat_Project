import pool from "../middleware/pool.js";

export default {
    chatGet: async (req, res) => {
        try {
            const db = await pool.query("SELECT * FROM Users WHERE email = ?", [
                req.decoded.email,
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
        }
    },
};
