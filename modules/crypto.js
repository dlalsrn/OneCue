const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretKey').secretKey;
const options = require('../config/secretKey').options;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    sign: async (user) => {

        const payload = {
            id: user.id,
        };

        return jwt.sign(payload, secretKey, options);
    },
    verify: async (token) => {
        let decoded;
        try {
            console.log(token)
            // verify를 통해 값 decode!
            decoded = jwt.verify(token, secretKey);
        } catch (err) {

            if (err.message === 'jwt expired') {
                console.log('expired token');
                return TOKEN_EXPIRED;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                console.log(TOKEN_INVALID);
                return TOKEN_INVALID;
            } else {
                console.log("invalid token");
                return TOKEN_INVALID;
            }
        }
        return decoded;
    },
    refresh: async (expireToken) => {
        models.sso.findOne({
            where: {
                access_token: {
                    [op.eq]: expireToken
                }
            }
        }).then(response => {
            if (response != null) {
                return this.sign(response.dataValues);
            } else {
                return null;
            }
        }).catch(error => {
            return null;
        })
    }
}