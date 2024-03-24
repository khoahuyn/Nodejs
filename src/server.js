const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.Port

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/Linh', (req, res) => {
    res.render('sample.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
