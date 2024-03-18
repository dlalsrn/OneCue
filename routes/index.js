const router = require('express').Router();
const message = require('../utils/message')

const userRouter = require('./user/index')
router.use('/user', userRouter)
const searchRouter = require('./search/index')
router.use('/search', searchRouter)
const matchRouter = require('./match/index')
router.use('/match', matchRouter)

router.get('/', function (req, res) {
    return res.status(message['200_OK'].status).send(message['200_OK'])
})

module.exports = router