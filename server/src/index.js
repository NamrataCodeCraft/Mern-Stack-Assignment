const express = require('express')
const mongoose = require('mongoose')
const rout = require('./router/rout.js')
const cors = require('cors')

const app = express()

const DB_URL = 'mongodb://127.0.0.1:27017/test'
mongoose.connect(DB_URL).then(_ => console.log('DB connect')).catch(err => console.log(err))

app.use(express.json())
app.use(cors());

app.use('/', rout)


app.listen(process.env.PORT, _ => console.log('server running'))