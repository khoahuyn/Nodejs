//Khai bao de su dung env
require('dotenv').config();
const express = require('express');
const apiRouter = require('./routes/api');
const cors = require('cors')


const app = express();
const port = process.env.Port || 3002;
const hostname = process.env.HOST_NAME;

//Khai báo routes
app.use('/', apiRouter)
app.use(cors());


app.listen(port, hostname, () => {
    console.log(`Web is run on port ${port}`)
})
