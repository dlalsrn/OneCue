const router = require('express').Router();
const message = require('../../utils/message')
const profileRouter = require('./profile/index')
const authRouter = require('./auth/index')
const infoRouter = require('./info/index')

router.use('/auth', authRouter)
router.use('/profile', profileRouter)
router.use('/info', infoRouter)

module.exports = router