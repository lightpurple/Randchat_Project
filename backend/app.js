const express = require('express')
const app = express()
const cors = require('cors')
require("dotenv").config();

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
  };

var authRouter = require('./routes/auth');
var chatRouter = require('./routes/chat');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'content-type, x-access-token'); //1
	next();
  });

// API

app.use('/auth', authRouter);
app.use('/chat', chatRouter);

// Server
const port = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server running on port ${port}`))
