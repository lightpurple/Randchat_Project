import * as dotenv from "dotenv";
dotenv.config();

export default {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB,
    password: process.env.DB_PWD,
    connectionLimit: process.env.DB_CONLIMT,
    waitForConnections: true,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false,
    },
};
