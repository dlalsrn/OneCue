const router = require('express').Router();
const message = require('../../../../../utils/message')
const matchController = require('../../../../../controllers/match')
const authMiddleware = require('../../../../../middlewares/auth').checkToken;

const weekendRouter = require('./weekend/index')
router.use('/weekend', weekendRouter)

router.get('/', authMiddleware, matchController.searchNearMatch)

module.exports = router