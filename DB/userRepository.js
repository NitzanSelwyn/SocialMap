const neo4j = require('neo4j-driver')
const dbConfig = require('./dbConfig').defult

let driver = neo4j.driver(
    dbConfig.neo4jConnectionString,
    neo4j.auth.basic(dbConfig.neo4jUser, dbConfig.neo4jPassword)
)

const session = driver.session({ defaultAccessMode: neo4j.session.READ })

exports.register = async (user, results, error) => {
    session.run('CREATE (p:Person {UserName: $userNameParam, Password: $passwordParam}) return p.UserName as p', {
        userNameParam: user.userName,
        passwordParam: user.userPassword
    })
        .then(result => {
            results(result.records[0].get('p'))
        })
        .catch(error => {
            console.log(err)
            error(err)
        })
        .then(() => session.close())
}





exports.login = (user, results, error) => {
    session.run(`MATCH (n:Person) RETURN n.name  as name LIMIT 25`, {
        nameParam: 'James'
    })
        .then(result => results(result.records.map(rec => rec.get('name'))))
        .catch(err => error(err))
        .then(() => session.close())
}

