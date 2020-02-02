const driver = require('../DB/neo4j')
const dbConfig = require('./dbConfig').defult

const session = driver.session()

exports.register = async (user, results, error) => {
    checkifUserExisit(user, (userExisits) => {
        if (userExisits) {
            throw new Error('Email Or User Name Allready exisit')
        } else {
            console.log('createing new user')
            const session2 = driver.session()
            session2.run('CREATE (p:Person {UserName: $userNameParam, Password: $passwordParam, Email: $emailParam}) return p as c', {
                userNameParam: user.userName,
                passwordParam: user.userPassword,
                emailParam: user.userEmail
            })
                .then(result2 => results(result2.records[0].get('c')))
                .catch(err => error(err))
                .then(() => session2.close())
        }
    }).catch(err => error(err)).then(() => session.close())
}


const checkifUserExisit = async (user, callBack) => {
    await session.writeTransaction(async txc => {
        let results = await txc.run(`
        MATCH (p:Person)
        WHERE p.UserName = $userNameParam OR p.Email = $emailParam
        RETURN p as p`, {
            userNameParam: user.userName,
            emailParam: user.userEmail
        })
        callBack(results.records.length >= 1)
    })
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

