const mysql = require("mysql2/promise");
const dbsecret = require("../config/db.js"); //git에 올릴 때 비밀번호가 유출되지 않게 하기 위해

const pool = mysql.createPool(dbsecret);
module.exports = pool;
