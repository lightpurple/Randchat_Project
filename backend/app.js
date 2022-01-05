import express from "express";
import { createServer } from "http";
import cors from "cors";
const app = express();
const server = createServer(app);
import webSocket from "./middleware/socket.js";
import * as Api from "./routes/routes.js";

// const { swaggerUi, specs } = require("./swagger");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "content-type, x-access-token"); //1
  next();
});

// API
app.use(Api.path, Api.router);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Server
const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));

server.listen(port, () => console.log(`Server running on port ${port}`));
webSocket(server); // 웹소켓 연결
