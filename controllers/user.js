const message = require('../utils/message')
const userModule = require('../modules/user')
const ssoModule = require('../modules/sso')
const { INTEGER } = require('sequelize')

function getNicknameExist(req, res) {
    if (req.query.nickname == null) return message['400_BAD_REQUEST']
    userModule.getNicknameExist(req.query.nickname).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

function getKakaoUserInfo(req, res, next) {
    if (req.query.accessToken == null) return message['400_BAD_REQUEST']
    ssoModule.getKakaoUserInfo(req.query.accessToken).then(kakaoUserInfo => {
        console.log(kakaoUserInfo)
    }).catch(error => {
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

function doOneCueSignIn(req, res, next) {
    if (req.body.id == null || req.body.pw == null) return message['400_BAD_REQUEST']
    userModule.doOneCueSignIn(req.body.id, req.body.pw).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

function doOneCueSignUp(req, res, next) {
    if (req.body.id == null || req.body.pw == null || req.body.email == null) return message['400_BAD_REQUEST']
    userModule.doOneCueSignUp(req.body.id, req.body.pw, req.body.email).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

function doKakaoSignIn(req, res, next) {
    if (req.body.sso_access_token == null) return message['400_BAD_REQUEST']
    ssoModule.getKakaoUserInfo(req.body.sso_access_token).then(kakaoUserInfo => {
        userModule.doSSOSignIn("KAKAO", kakaoUserInfo.id).then(response => {
            return res.status(response.status).send(response)
        }).catch(error => {
            if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
            else return res.status(error.status).send(error)
        })
    }).catch(error => {
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

function checkUserInfoExist(req, res, next) {
    if (req.id == null) return message['400_BAD_REQUEST']
    userModule.checkUserInfoExist(req.id).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

function doSSOCreateUserInfo(req, res, next) {
    if (req.id == null || req.body.email == null) return message['400_BAD_REQUEST']
    userModule.doSSOCreateUserInfo(req.id, req.body.email).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

function createProfile(req, res, next) {
    if (req.id == null || req.body.nickname == null || req.body.sido == null || req.body.sigungu == null || req.body.average == null) return message['400_BAD_REQUEST']
    userModule.createProfile(req.id, req.body.nickname, req.body.sido, req.body.sigungu, req.body.average, req.body.introduce).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

function getProfile(req, res, next) {
    if (req.id == null) return res.send(message['404_NOT_FOUND'])
    userModule.getProfile(req.id).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

function getOtherProfile(req, res, next) {
    if (req.id == null) return res.send(message['404_NOT_FOUND'])
    if (typeof Number(req.params.user_id) !== 'number') return res.send(message['400_BAD_REQUEST'])
    userModule.getProfile(Number(req.params.user_id)).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

module.exports = {
    getNicknameExist,
    getKakaoUserInfo,
    doOneCueSignIn,
    doOneCueSignUp,
    doKakaoSignIn,
    doSSOCreateUserInfo,
    checkUserInfoExist,
    createProfile,
    getProfile,
    getOtherProfile
}