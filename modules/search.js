const message = require('../utils/message')

function getLocalInfoByKakao(search_key, lat, lng, page) {
    return new Promise((resolve, reject) => {
        if (search_key == null || lat == null || lng == null || page == null) {
            return reject(message['400_BAD_REQUEST'])
        }
        console.log("https://dapi.kakao.com/v2/local/search/keyword.json?page=" + page + "&size=15&sort=accuracy&query=" + encodeURIComponent(search_key) + "&x=" + lng + "&y=" + lat, "KakaoAK " + process.env.KAKAO_ID)
        fetch("https://dapi.kakao.com/v2/local/search/keyword.json?page=" + page + "&size=15&sort=accuracy&query=" + encodeURIComponent(search_key) + "&x=" + lng + "&y=" + lat, {
            headers: { "Authorization": "KakaoAK " + process.env.KAKAO_ID }
        }).then((response) => response.json())
            .then((responseData) => {
                if (responseData.documents.length > 0) {
                    var sucessObj = Object.assign(message['200_OK'], {})
                    sucessObj.response = responseData
                    return resolve(sucessObj)
                } else {
                    return reject(message['404_NOT_FOUND'])
                }
            }).catch(error => {
                return message["500_INTERNAL_SERVER_ERROR"]
            })
    })
}

module.exports = {
    getLocalInfoByKakao
}