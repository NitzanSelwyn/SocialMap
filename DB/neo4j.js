const neo4j = require('neo4j-driver')
const dbConfig = require('./dbConfig').defult

let driver = neo4j.driver(
    dbConfig.neo4jConnectionString,
    neo4j.auth.basic(dbConfig.neo4jUser, dbConfig.neo4jPassword)
)

const session = driver.session({ defaultAccessMode: neo4j.session.READ })

exports.session = session

