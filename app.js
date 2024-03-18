const express = require('express')
const app = express()
const port = 3030
process.env.TZ = "Asia/Seoul"

const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('dotenv').config()
const indexRouter = require("./routes/index")
app.use(indexRouter)


const { sequelize } = require('./models/index')


////////////////////////////////////////////////////////////////////////////


sequelize
    .sync()
    .then(() => console.log('connected database'))
    .catch(err => console.error('occurred error in database connecting', err))

app.listen(port, () => {
    console.log("listening on port " + port)
})