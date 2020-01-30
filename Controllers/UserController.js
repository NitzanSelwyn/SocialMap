const hashPasswordHelper = require('../Helpers/HashPasswordHelper')
const validator = require('validator');
const userRepository = require('../DB/userRepository')
const auth = require('../Helpers/Authentication')


exports.login = (req, res) => {
    const userName = validator.trim(req.body.userName)
    const userPassword = validator.trim(req.body.userPassword)
    let encryptedPassword = null

    if (!validator.isEmail(userName)) {
        return res.status(500).send('email is not valide')
    }

    hashPasswordHelper.EncryptPassword(userPassword).then((result) => {
        encryptedPassword = result
    }).catch(error => {
        return res.send(error)
    })

    userRepository.login({ userName: userName, userPassword: encryptedPassword }, (result) => {
        console.log(result)
        if (result === null) {
            return status(400).send('user is incorect')
        }

        const token = auth.genrateToken(result.email)
        return res.send({ result, token })
    }, (err) => {
        console.log(err)
        return res.status(500).send(err)
    })
}

exports.register = async (req, res) => {
    const userName = validator.trim(req.body.userName)
    const userPassword = validator.trim(req.body.userPassword)

    if (!validator.isEmail(userName)) {
        res.status(500).send('email is not valide')
    }
    const encryptedPassword = await hashPasswordHelper.EncryptPassword(userPassword)

    userRepository.register({ userName: userName, userPassword: encryptedPassword }, (result) => {
        console.log(result)
        res.status(200).send(result)
    }, (err) => {
        console.log(err)
        res.status(400).send("bad")
    })
}