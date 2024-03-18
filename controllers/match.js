const message = require('../utils/message')
const matchModule = require('../modules/match')

function insertMatch(req, res, next) {
    if (req.body.billiard_room_name == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof(req.body.billiard_room_name) !== 'string') return res.send(message['400_BAD_REQUEST'])

    if (req.body.billiard_room_lat == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof(req.body.billiard_room_lat) !== 'number') return res.send(message['400_BAD_REQUEST'])

    if (req.body.billiard_room_lng == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof(req.body.billiard_room_lng) !== 'number') return res.send(message['400_BAD_REQUEST'])

    if (req.body.billiard_room_address == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof(req.body.billiard_room_address) !== 'string') return res.send(message['400_BAD_REQUEST'])

    if (req.body.start_date == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof(req.body.start_date) !== 'string') return res.send(message['400_BAD_REQUEST'])

    if (req.body.finish_date == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof(req.body.finish_date) !== 'string') return res.send(message['400_BAD_REQUEST'])

    if (req.body.ball_type == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof(req.body.ball_type) !== 'string') return res.send(message['400_BAD_REQUEST'])
    
    if (req.body.recruit_num == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof(req.body.recruit_num) !== 'number') return res.send(message['400_BAD_REQUEST'])

    if (req.body.apply_cost == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof(req.body.apply_cost) !== 'number') return res.send(message['400_BAD_REQUEST'])

    
    
    matchModule.insertMatch(req.body.billiard_room_name,req.body.billiard_room_lat,req.body.billiard_room_lng,req.body.billiard_room_address,req.body.start_date,req.body.finish_date,req.body.ball_type,req.body.recruit_num,req.body.apply_cost,req.body.notes).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

function searchMatch(req, res, next) {
    if (req.id == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof(req.body.offset) !== 'number') return res.send(message['400_BAD_REQUEST'])
    matchModule.searchMatch(req.body.offset).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

function joinMatch(req, res, next) {
    if (req.id == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof Number(req.params.match_id) !== 'number') return res.send(message['400_BAD_REQUEST'])
    matchModule.joinMatch(req.id, Number(req.params.match_id)).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        console.log(error)
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

function showDetailMatch(req, res, next) {
    if (req.id == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof Number(req.params.match_id) !== 'number') return res.send(message['400_BAD_REQUEST'])
    matchModule.showDetailMatch(Number(req.params.match_id)).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        console.log(error)
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

function searchWeekendMatch(req, res, next) {
    if (req.id == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof(req.body.lat) !== 'number' || typeof(req.body.lng) !== 'number')  return res.send(message['400_BAD_REQUEST'])
    else if (typeof(req.body.offset) !== 'number')    return res.send(message['400_BAD_REQUEST'])
    matchModule.searchWeekendMatch(req.body.offset, req.body.lat, req.body.lng).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        if (error.status == null)   return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else    return res.status(error.status).send(error)
    })
}

function searchNearMatch(req, res, next) {
    if (req.id == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof(req.body.lat) !== 'number' || typeof(req.body.lng) !== 'number')  return res.send(message['400_BAD_REQUEST'])
    else if (typeof(req.body.offset) !== 'number') return res.send(message['400_BAD_REQUEST'])
    matchModule.searchNearMatch(req.body.offset, req.body.lat, req.body.lng).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

module.exports = {
    insertMatch,
    searchMatch,
    joinMatch,
    showDetailMatch,
    searchWeekendMatch,
    searchNearMatch,
}