const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path'); 

const app = express();

//Write Logs
const logStream = fs.createWriteStream(path.join(__dirname, 'file.log'), { flags: 'a' })

app.use(express.json());
app.use(morgan('dev'));
// setup the logger
app.use(morgan('combined', { stream: logStream }))


const auth = require('./routes/apis/auth');
const jsonpatch = require('./routes/apis/jsonpatch');

app.use('/api/auth', auth);
app.use('/api/json-patch', jsonpatch);

const port = process.env.PORT || 5000;
app.listen(port);

module.exports = app