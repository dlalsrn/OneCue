const express = require('express');
const router = express.Router();

const kakaoRouter = require('./kakao/index')
const userController = require('../../../../controllers/user');
const authMiddleware = require('../../../../middlewares/auth').checkToken;

router.use("/kakao", kakaoRouter);

router.post("/create-info", authMiddleware, userController.doSSOCreateUserInfo)

module.exports = router