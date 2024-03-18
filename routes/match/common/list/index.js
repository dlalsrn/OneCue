const router = require('express').Router();
const message = require('../../../../utils/message')
const authMiddleware = require('../../../../middlewares/auth').checkToken;
const matchController = require('../../../../controllers/match')

const distanceRouter = require('./distance/index')
router.use('/distance', distanceRouter)

router.get('/', authMiddleware, matchController.searchMatch)

module.exports = router