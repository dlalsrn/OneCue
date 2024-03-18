const router = require('express').Router();
const message = require('../../../../../../utils/message')
const matchController = require('../../../../../../controllers/match')
const authMiddleware = require('../../../../../../middlewares/auth').checkToken;

router.get('/', authMiddleware, matchController.searchWeekendMatch)

module.exports = router