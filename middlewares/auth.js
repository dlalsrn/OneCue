const jwt = require('../modules/crypto');
const message = require('../utils/message');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
    checkToken: async (req, res, next) => {
        var token = req.headers.authorization;
        // req.id = 2;
        // next()
        if (token != null) {
            console.log(token)
            var originToken = token.split(" ")[1];
            const user = await jwt.verify(originToken);

            if (user === TOKEN_EXPIRED) {
                return res.status(message["401_EXPIRED_TOKEN"].status).send(message["401_EXPIRED_TOKEN"])
            } else if (user === TOKEN_INVALID) {
                return res.status(message["401_INVALID_TOKEN"].status).send(message["401_INVALID_TOKEN"])
            } else if (user.id === undefined) {
                return res.status(message["401_INVALID_TOKEN"].status).send(message["401_INVALID_TOKEN"])
            }

            req.id = user.id;
            next()
        } else {
            return res.status(message["400_BAD_REQUEST"].status).send(message["400_BAD_REQUEST"])
        }
    }
};

module.exports = authUtil