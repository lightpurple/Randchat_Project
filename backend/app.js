const express = require('express')
const app = express()
const cors = require('cors')
require("dotenv").config();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'content-type, x-access-token'); //1
	next();
  });

// API

app.use('/auth', require('./routes/auth'));
app.use('/chat', require('./routes/chat'));

// Server
const port = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server running on port ${port}`))