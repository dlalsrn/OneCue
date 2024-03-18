const router = require('express').Router();
const message = require('../../utils/message')

const commonRouter = require("./common/index")
router.use("/common", commonRouter)

module.exports = router