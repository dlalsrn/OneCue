const router = require('express').Router();
const message = require('../../../../utils/message')
const authMiddleware = require('../../../../middlewares/auth').checkToken;
const matchController = require('../../../../controllers/match')

router.get('/:match_id', authMiddleware, matchController.showDetailMatch)

module.exports = router