const express = require('express');
const router = express.Router();
const userController = require("../../../controllers/user")
const authMiddleware = require('../../../middlewares/auth').checkToken

router.post('/check', authMiddleware, userController.checkUserInfoExist)

module.exports = router