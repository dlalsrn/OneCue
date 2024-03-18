const message = require('../utils/message')
const searchModule = require('../modules/search')

function getLocalInfoByKakao(req, res) {
    searchModule.getLocalInfoByKakao(req.query.search_key, req.query.lat, req.query.lng, req.query.page).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        if (error.status == null) return res.status(message["500_INTERNAL_SERVER_ERROR"].status).send(message["500_INTERNAL_SERVER_ERROR"])
        else return res.status(error.status).send(error)
    })
}

module.exports = {
    getLocalInfoByKakao
}