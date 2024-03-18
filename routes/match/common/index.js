const router = require('express').Router();
const message = require('../../../utils/message')

const listRouter = require('./list/index')
router.use('/list', listRouter)
const joinRouter = require('./join/index')
router.use('/join', joinRouter)
const detailRouter = require('./detail/index')
router.use('/detail', detailRouter)
const createRouter = require('./create/index')
router.use('/create', createRouter)

module.exports = router