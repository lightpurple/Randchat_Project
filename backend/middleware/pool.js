import { createPool } from "mysql2/promise";
import dbsecret from "../config/config.js"; //git에 올릴 때 비밀번호가 유출되지 않게 하기 위해

const pool = createPool(dbsecret);
export default pool;
