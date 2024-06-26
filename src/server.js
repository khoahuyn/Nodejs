//Khai bao de su dung env
require('dotenv').config();
const express = require('express');
const apiRouter = require('./routes/api');
const apiAlert = require('./routes/alert');

const cors = require('cors')


const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.Port || 3002;
const hostname = process.env.HOST_NAME;

//Khai báo routes
app.use('/', apiRouter)
app.use('/alert', apiAlert)



app.listen(port, hostname, () => {
    console.log(`Web is run on port ${port}`)
})
