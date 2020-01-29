const hashPasswordHelper = require('../Helpers/HashPasswordHelper')
const validator = require('validator');
const userRepository = require('../DB/userRepository')

exports.login = (req, res) => {
    const userName = validator.trim(req.body.userName)
    const userPassword = validator.trim(req.body.userPassword)
    let encryptedPassword = null

    if (!validator.isEmail(userName)) {
        return res.status(500).send('email is not valide')
    }

    const hello = hashPasswordHelper.EncryptPassword(userPassword).then((result) => {
        encryptedPassword = result
    }).catch(error => {
        return res.send(error)
    })

    userRepository.login({ userName: userName, userPassword: encryptedPassword }, (result) => {
        console.log(result)
        res.send(result)
    }, (err) => {
        console.log(err)
    })
}

exports.register = (req, res) => {
    const userName = validator.trim(req.body.userName)
    const userPassword = validator.trim(req.body.userPassword)

    if (!validator.isEmail(userName)) {
        res.status(500).send('email is not valide')
    }
    const encryptedPassword = hashPasswordHelper.EncryptPassword(userPassword)

    userRepository.register({ userName: userName, userPassword: encryptedPassword })
}