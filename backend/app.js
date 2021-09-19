const express = require('express')
const app = express()
const cors = require('cors')

// DB
var {sequelize} = require('./models/index')
sequelize.sync();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// API

const router = require('./routes/auth.js');
app.use('/auth', router);

// Server
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server running on port ${port}`))
