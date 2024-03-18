const message = require('../utils/message')

function getKakaoUserInfo(accessToken) {
    return new Promise((resolve, reject) => {
        fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-type": "application/json",
            },
        }).then((response) => response.json())
            .then((responseData) => { return resolve(responseData) })
            .catch(error => { return reject(message["503_SSO_SERVER_ERROR"]) })
    })
}

module.exports = {
    getKakaoUserInfo
}