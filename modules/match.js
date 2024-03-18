const { response } = require('express');
const { sequelize, Sequelize } = require('../models');
const models = require('../models');
const message = require('../utils/message');

function insertMatch(_billiard_room_name,_billiard_room_lat,_billiard_room_lng,_billiard_room_address,_start_date,_finish_date,_ball_type,_recruit_num,_apply_cost,_notes){
    return new Promise((resolve, reject) => {
        const s_day = new Date(_start_date).getDay()
        const f_day = new Date(_finish_date).getDay()
        
        models.match.create({
            billiard_room_name : _billiard_room_name,
            billiard_room_lat : _billiard_room_lat,
            billiard_room_lng : _billiard_room_lng,
            billiard_room_address : _billiard_room_address,
            start_date : _start_date,
            start_date_day : s_day,
            finish_date : _finish_date,
            finish_date_day : f_day,
            ball_type : _ball_type,
            recruit_num : _recruit_num,
            apply_cost : _apply_cost,
            notes : _notes
        }).then(response => {
            if(response != null){
                return resolve(message['200_OK'])
            }
            else return reject(message['404_NOT_FOUND'])
        }).catch(error => {
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })
    })
}

function searchMatch(_offset) {
    return new Promise((resolve, reject) => {
        models.match.findAll({
            order: ['start_date'],
            offset: _offset,
            limit: 10
        }).then(response => {
            if (response != null){
                var successObj = Object.assign({}, message['200_OK'])
                successObj.matches = response
                return resolve(successObj)
            }
            else return reject(message['404_NOT_FOUND'])
        }).catch(error => {
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })

    })
}

function joinMatch(_userID, _match_id) {
    return new Promise((resolve, reject) => {
        models.match.findOne({
            where: {
                id: _match_id
            }
        }).then(response => {
            if (response != null){
                const max = response.dataValues['recruit_num']
                models.apply.findAll({
                    where: {
                        match_id: _match_id,
                        status: 1
                    }
                }).then(response => {
                    if (response.length <= max) {
                        models.apply.create({
                            status: 0,
                            user_id: _userID,
                            match_id: _match_id
                        }).then(response => {
                            return resolve(message['200_OK'])
                        }).catch(error => {
                            return reject(message['500_INTERNAL_SERVER_ERROR'])
                        })
                    }
                    else 
                        return reject(message['400_BAD_REQUEST'])
                }).catch(error => {
                    console.log(error)
                    return reject(message['500_INTERNAL_SERVER_ERROR'])
                })
            }
            else 
                return reject(message['404_NOT_FOUND'])
        }).catch(error => {
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })
    })
}

function showDetailMatch(_match_id) {
    return new Promise((resolve, reject) => {
        models.match.findOne({
            where: {
                id: _match_id
            }
        }).then(response => {
            if (response != null){
                var successObj = Object.assign({}, message['200_OK'])
                successObj.matches = response.dataValues
                return resolve(successObj)
            }
            else return reject(message['404_NOT_FOUND'])
        }).catch(error => {
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })
    })
}

function searchWeekendMatch(_offset, _lat, _lng) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT M.id, M.billiard_room_name, M.ball_type, M.start_date,
        M.start_date_day, M.finish_date, M.finish_date_day, M.recruit_num, M.apply_cost, T.distance
        FROM matches AS M,
        (SELECT id, 6371 * acos(sin(radians(billiard_room_lat)) * sin(radians(:latitude))
        + cos(radians(billiard_room_lat)) * cos(radians(:latitude)) * cos(radians(abs(billiard_room_lng - :longitude)))) AS distance
        FROM matches) AS T
        WHERE M.id = T.id AND T.distance <= 10 AND (start_date_day = 0 OR start_date_day = 6)
        ORDER BY start_date_day, start_date, distance
        LIMIT :offset, :limit
        `
        sequelize.query(query, {
            replacements: {
                latitude: _lat,
                longitude: _lng,
                offset: _offset,
                limit: 10
            },
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        }).then(response => {
            if (response != null) {
                var successObj = Object.assign({}, message['200_OK'])
                successObj.match = response
                return resolve(successObj)
            }
            else    return reject(message['404_NOT_FOUND'])
        }).catch(error => {
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })

    })
}

function searchNearMatch(_offset, _lat, _lng) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT M.id, M.billiard_room_name, M.ball_type, M.start_date,
        M.start_date_day, M.finish_date, M.finish_date_day, M.recruit_num, M.apply_cost, T.distance
        FROM matches AS M,
        (SELECT id, 6371 * acos(sin(radians(billiard_room_lat)) * sin(radians(:latitude))
        + cos(radians(billiard_room_lat)) * cos(radians(:latitude)) * cos(radians(abs(billiard_room_lng - :longitude)))) AS distance
        FROM matches) AS T
        WHERE M.id = T.id AND T.distance <= 10
        ORDER BY start_date_day, start_date, distance
        LIMIT :offset, :limit
        `
        sequelize.query(query, {
            replacements: {
                latitude: _lat,
                longitude: _lng,
                offset: _offset,
                limit: 10
            },
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        }).then(response => {
            if (response != null) {
                var successObj = Object.assign({}, message['200_OK'])
                successObj.match = response
                return resolve(successObj)
            }
            else return reject(message['404_NOT_FOUND'])
        }).catch(error => {
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })
    })
}

module.exports = {
    insertMatch,
    searchMatch,
    joinMatch,
    showDetailMatch,
    searchWeekendMatch,
    searchNearMatch
}