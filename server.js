const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Connect databse
connectDB();

app.get('/', (req, res) => res.send('API Running'));

// routes
require('./routes/auth.routes')(app);
//require('./routes/user.routes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server starter on port ${PORT}`));

// console.log('No value for FOO yet:', process.env.FOO);

// if (process.env.NODE_ENV !== 'production') {
// 	require('dotenv').config();
// }

// console.log('Connection url => ', process.env.MONGO_URL);
// console.log('Now the value for FOO is:', process.env.FOO);
