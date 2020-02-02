const driver = require('../DB/neo4j')
const dbConfig = require('./dbConfig').defult

const session = driver.session()

exports.register = async (user, results, error) => {
    session.run('CREATE (p:Person {UserName: $userNameParam, Password: $passwordParam, Email: $emailParam}) return p.UserName as p', {
        userNameParam: user.userName,
        passwordParam: user.userPassword,
        emailParam: user.userEmail
    })
        .then(result => results(result.records[0].get('p')))
        .catch(err => error(err))
        .then(() => session.close())
}

exports.login = (user, results, error) => {
    console.log(user)
    session.run(`MATCH (p:Person {UserName: $userNameParam}) RETURN p as p`, {
        userNameParam: user.userName,
        passwordParam: user.userPassword,
    })
        .then(result => {
            // if (typeof result.records[0] == 'undefined') {
            //     console.log('wow')
            //     throw new Error
            // }
            results(result.records[0].get('p'))
        })
        .catch(err => error(err))
        .then(() => session.close())
}

