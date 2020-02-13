const socialRepository = require('../DB/socialRepository')
const { makeHttpError } = require('../Helpers/https-error')

exports.upload = async (req, res) => {
    console.log('In Social Controller')
    const post = {
        user: req.body.userName,
        content: req.body.content,
        image: req.body.image,
        date: req.body.date
    }

    socialRepository.upload(post, (result) => {
        return res.sendStatus(200)
    }, (err) => {
        console.log(err)
        return makeHttpError(400, err)
    })
}

exports.getUsersPost = async (req, res) => {

    const user = req.query.username

    socialRepository.getUsersPosts(user, (results) => {
        return res.send(results)
    }, (error) => {
        return makeHttpError(500, error)
    })

}

exports.getFeed = async (req, res) => {

    const user = req.query.username

    socialRepository.getFeed(user, results => {
        return res.send(418, results)
    }, error => {
        return makeHttpError(400, error)
    })
}