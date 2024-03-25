//Khai bao de su dung env
require('dotenv').config();
const express = require('express');
const { configStaticFile, configViewEngine } = require('./config/viewEngine');
const webRouter = require('./routes/web');
const connection = require('./config/database');

const app = express();
const port = process.env.Port || 3002;
const hostname = process.env.HOST_NAME;

configViewEngine(app);
configStaticFile(app);

//Khai báo routes
app.use('/', webRouter)

connection.query(
    'SELECT * FROM Employee',
    function (err, results, fields) {
        console.log(results); // results contains rows returned by server
    }
);

app.listen(port, hostname, () => {
    console.log(`Web is run on port ${port}`)
})
