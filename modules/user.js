const { response } = require('express');
const models = require('../models');
const message = require('../utils/message');
const crypto = require('./crypto')

function getNicknameExist(_nickname) {
    return new Promise((resolve, reject) => {
        models.profile.findOne({
            where: {
                nickname: _nickname
            }
        }).then(response => {
            if (response == null) return reject(message["404_NOT_FOUND"])
            else return resolve(message['200_OK'])
        }).catch(error => {
            console.log(error);
            return reject(message["500_INTERNAL_SERVER_ERROR"])
        })
    })
}

function issueJWT(user) {
    return new Promise((resolve, reject) => {
        crypto.sign(user).then(response => {
            return resolve(response)
        }).catch(error => {
            return reject(error)
        })
    })
}

function doOneCueSignIn(_id, _pw) {
    return new Promise((resolve, reject) => {
        models.user_info.findOne({
            where: {
                uID: _id,
                uPW: _pw
            }
        }).then(response => {
            if (response != null) {
                issueJWT({ id: response.dataValues.user_id }).then(response => {
                    var successObj = Object.assign({}, message['200_OK'])
                    successObj.access_token = response
                    return resolve(successObj)
                }).catch(error => {
                    return reject(error)
                })
            }
            else {
                return reject(message['404_NOT_FOUND'])
            }
        })
    })
}

function getAlreadyIDNotExist(_id) {

    return new Promise((resolve, reject) => {
        models.user_info.findOne({
            where: {
                uID: _id
            }
        }).then(response => {
            if (response != null) {
                var badRequestObj = Object.assign({}, message['400_BAD_REQUEST'])
                badRequestObj.message = "ALREADY_EXIST_ID"
                return reject(badRequestObj)
            } else {
                return resolve(message['200_OK'])
            }
        }).catch(error => {
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })

    })
}

function doOneCueSignUp(_id, _pw, _email) {
    return new Promise((resolve, reject) => {
        getAlreadyIDNotExist(_id).then(response => {
            if (_email.indexOf('@') != -1 && _email.indexOf('.') != -1) {
                models.user.create({
                    type: process.env.ONECUE_TYPE,
                }).then(response => {
                    if (response != null) {
                        models.user_info.create({
                            user_id: response.dataValues.id,
                            uID: _id,
                            uPW: _pw,
                            email: _email
                        }).then(response => {
                            if (response != null) {
                                return resolve(message['200_OK'])
                            } else {
                                return reject(message['500_INTERNAL_SERVER_ERROR'])
                            }
                        }).catch(error => {
                            return reject(message['500_INTERNAL_SERVER_ERROR'])
                        })
                    } else {
                        return reject(message['500_INTERNAL_SERVER_ERROR'])
                    }
                }).catch(error => {
                    return reject(error)
                })
            } else {
                var badRequestObj = Object.assign({}, message['400_BAD_REQUEST'])
                badRequestObj.message = "INVALID_EMAIL"
                return reject(badRequestObj)
            }
        }).catch(error => {
            return reject(error)
        })

    })
}

function doSSOSignUp(_provider, _providerID) {
    return new Promise((resolve, reject) => {
        models.user.create({
            type: process.env.SSO_TYPE,
            provider: _provider,
            provider_id: _providerID
        }).then(response => {
            if (response != null) {
                var successObj = Object.assign({}, message['200_OK'])
                successObj.user_id = response.dataValues.id
                return resolve(successObj)
            } else {
                return reject(message['500_INTERNAL_SERVER_ERROR'])
            }
        }).catch(error => {
            console.log(error)
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })
    })

}

function doSSOSignIn(_provider, _providerID) {
    return new Promise((resolve, reject) => {
        models.user.findOne({
            where: {
                type: process.env.SSO_TYPE,
                provider: _provider,
                provider_id: _providerID
            }
        }).then(response => {
            if (response != null) {
                issueJWT({ id: response.dataValues.id }).then(response => {
                    var successObj = Object.assign({}, message['200_OK'])
                    successObj.access_token = response
                    return resolve(successObj)
                }).catch(error => {
                    return reject(error)
                })
            } else {
                doSSOSignUp(_provider, _providerID).then(response => {
                    issueJWT({ id: response.user_id }).then(response => {
                        var successObj = Object.assign({}, message['200_OK'])
                        successObj.access_token = response
                        return resolve(successObj)
                    }).catch(error => {
                        console.log(error)
                        return reject(error)
                    })
                }).catch(error => {
                    console.log(error)
                    return reject(error)
                })
            }
        })
    })
}

function doSSOCreateUserInfo(_userID, _email) {
    return new Promise((resolve, reject) => {
        if (_email.indexOf('@') != -1 && _email.indexOf('.') != -1) {
            models.user_info.create({
                user_id: _userID,
                email: _email
            }).then(response => {
                if (response != null) return resolve(message['200_OK'])
                else return reject(message['500_INTERNAL_SERVER_ERROR'])
            }).catch(error => {
                return reject(message['500_INTERNAL_SERVER_ERROR'])
            })
        } else {
            var badRequestObj = Object.assign({}, message['400_BAD_REQUEST'])
            badRequestObj.message = "INVALID_EMAIL"
            return reject(badRequestObj)
        }
    })
}

function checkUserInfoExist(_userID) {
    return new Promise((resolve, reject) => {
        models.user_info.findOne({
            where: {
                user_id: _userID
            }
        }).then(response => {
            if (response != null) {
                return resolve(message['200_OK'])
            } else {
                return reject(message['404_NOT_FOUND'])
            }
        }).catch(error => {
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })
    })
}

function alreadNotExistProfile(_userID) {
    return new Promise((resolve, reject) => {
        models.profile.findOne({
            where: {
                user_id: _userID
            }
        }).then(response => {
            if (response != null) {
                var badRequestObj = Object.assign({}, message['400_BAD_REQUEST'])
                badRequestObj.message = "ALREADY_EXIST_PROFILE"
                return reject(badRequestObj)
            } else {
                return resolve(message['200_OK'])
            }
        }).catch(error => {
            console.log(error)
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })
    })
}

function createProfile(_userID, _nickname, _sido, _sigungu, _average, _introduce) {
    return new Promise((resolve, reject) => {
        alreadNotExistProfile(_userID).then(response => {
            models.profile.create({
                user_id: _userID,
                nickname: _nickname,
                sido: _sido,
                sigungu: _sigungu,
                average: _average,
                introduce: (_introduce != null ? _introduce : "")
            }).then(response => {
                if (response != null) return resolve(message['200_OK'])
                else return reject(message['500_INTERNAL_SERVER_ERROR'])
            }).catch(error => {
                return reject(message['500_INTERNAL_SERVER_ERROR'])
            })
        }).catch(error => {

            return reject(error)
        })
    })
}

function getProfile(_userID) {
    return new Promise((resolve, reject) => {
        models.profile.findOne({
            where: {
                user_id: _userID
            }
        }).then(response => {
            if (response != null){
                var successObj = Object.assign({}, message['200_OK'])
                successObj.profile = response.dataValues
                return resolve(successObj)
            }
            else return reject(message['404_NOT_FOUND'])
        }).catch(error => {
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })
    })
}

module.exports = {
    getNicknameExist,
    doOneCueSignIn,
    doOneCueSignUp,
    doSSOSignIn,
    doSSOCreateUserInfo,
    checkUserInfoExist,
    createProfile,
    getProfile
}