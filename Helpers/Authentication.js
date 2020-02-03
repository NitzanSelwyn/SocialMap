const jwt = require('jsonwebtoken')

const authenticateToken = async (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        jwt.verify(token, 'onesecret', (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
}


const genrateToken = function (email) {
    return jwt.sign({ _id: email }, 'onesecret')
}

module.exports = { authenticateToken, genrateToken }



