const hashPasswordHelper = require('../Helpers/HashPasswordHelper')
const validator = require('validator');
const userRepository = require('../DB/userRepository')
const auth = require('../Helpers/Authentication')
const { SendWelcomEmail } = require('../Helpers/mailer')
const { makeHttpError } = require('../Helpers/https-error')


exports.login = async (req, res) => {
    const userName = validator.trim(req.body.userName)
    const userPassword = validator.trim(req.body.userPassword)

    const encryptedPassword = await hashPasswordHelper.EncryptPassword(userPassword)

    userRepository.login({ userName: userName, userPassword: encryptedPassword }, (result) => {
        if (result === null) {
            return makeHttpError(400, 'password or username are incorrect')
        }

        if (hashPasswordHelper.IsMatch(userPassword, result.properties.Password)) {
            const token = auth.genrateToken(result)
            return res.send({
                user: {
                    UserName: result.properties.UserName,
                    Email: result.properties.Email
                }, token
            })
        } else {
            return makeHttpError(401, 'password or username are incorrect')
        }
    }, (err) => {
        console.log(err)
        return makeHttpError(500, err)
    })
}

exports.register = async (req, res) => {
    const userName = validator.trim(req.body.userName)
    const userPassword = validator.trim(req.body.userPassword)
    const email = validator.trim(req.body.userEmail)

    if (!validator.isEmail(email)) {
        return makeHttpError(500, 'email is incorrect')
    }
    const encryptedPassword = await hashPasswordHelper.EncryptPassword(userPassword)

    userRepository.register({ userName: userName, userPassword: encryptedPassword, userEmail: email }, (result) => {
        // console.log(result)
        const token = auth.genrateToken(result)
        SendWelcomEmail(result.properties.Email, result.properties.UserName)
        res.status(200).send({
            user: {
                UserName: result.properties.UserName,
                Email: result.properties.Email
            }, token
        })
    }, (err) => {
        console.log(err)
        return makeHttpError(400, err.message)
    })
}