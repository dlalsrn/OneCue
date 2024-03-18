const express = require('express');
const router = express.Router();
const oneCueRouter = require('./onecue/index')
const ssoRouter = require('./sso/index')
router.use("/onecue", oneCueRouter);
router.use("/sso", ssoRouter);

module.exports = router;