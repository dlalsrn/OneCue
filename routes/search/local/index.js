const router = require('express').Router();
const message = require('../../../utils/message')

const searchController = require('../../../controllers/search')

router.get('/', searchController.getLocalInfoByKakao)

module.exports = router