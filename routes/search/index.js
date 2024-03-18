const router = require('express').Router();
const message = require('../../utils/message')

const localRouter = require("./local/index")
router.use("/local", localRouter)

module.exports = router