const jwt = require('jsonwebtoken')

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        jwt.verify(token, 'onesecret')
    } catch (error) {
        res.status(401).send(error)
    }
    next()
}

const genrateToken = function (email) {
    return jwt.sign({ _id: email }, 'onesecret')
}

module.exports = { authenticateToken, genrateToken }



