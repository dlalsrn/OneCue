const express = require('express');
const router = express.Router();
const userController = require('../../../../controllers/user');

router.post('/signin', userController.doOneCueSignIn)
router.post('/signup', userController.doOneCueSignUp)

module.exports = router;