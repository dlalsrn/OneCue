const router = require('express').Router();
const message = require('../../../utils/message')
const userController = require('../../../controllers/user')
const authMiddleware = require('../../../middlewares/auth').checkToken;
router.get('/nickname/exist', userController.getNicknameExist)
router.post('/create', authMiddleware, userController.createProfile)
router.get('/', authMiddleware, userController.getProfile)
router.get('/:user_id', authMiddleware, userController.getOtherProfile)

module.exports = router