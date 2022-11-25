const cokieParser = require('cookie-parse')
const express = require('express')

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cokieParser())
