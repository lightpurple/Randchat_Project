const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, { cors: { origin: "*" } });

require("dotenv").config();

const { swaggerUi, specs } = require("./swagger");

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};

const authRouter = require("./routes/auth");
const chatRouter = require("./routes/chat");

//라우터에서 io를 객체로 쓸 수 있게함
app.set("io", io);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "content-type, x-access-token"); //1
    next();
});

// API

app.use("/auth", authRouter);
app.use("/chatting", chatRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Server
const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));
server.listen(port, () => console.log(`Server running on port ${port}`));
