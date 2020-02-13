const driver = require('../DB/neo4j')


exports.upload = async (post, results, error) => {
    const session = driver.session()
    session.run(`MATCH (u:Person{UserName: $userNameParam}) 
                CREATE (u)-[:Posted]->(p:Post {Auther: $userNameParam, Content: $postContectParam, Image: $postImageParam, UploadDate: $postDateParam}) 
                RETURN *`, {
        userNameParam: post.user,
        postContectParam: post.content,
        postImageParam: post.image,
        postDateParam: post.date
    })
        .then(result => {
            session.close()
            results(result)
        })
        .catch(err => error(err))
        .then(() => session.close())
}

exports.getUsersPosts = async (userName, results, error) => {
    const session = driver.session()

    session.run(`MATCH (u:Person{UserName:$userNameParam})-[:Posted]->(p:Post)
                 RETURN p as p ORDER BY p.UploadDate DESC`, {
        userNameParam: userName
    })
        .then(res => results(res.records.map(rec => rec.get('p').properties)))
        .catch(err => error(err))
        .then(() => session.close())
}

exports.getFeed = async (userName, result, error) => {
    const session = driver.session()

    session.run(`MATCH (u:Person{UserName: $userNameParam})-[:Follow]->(u2:Person)-[:Posted]->(p:Post)
                 RETURN p as p ORDER BY p.UploadDate DESC`, {
        userNameParam: userName
    })
        .then(res => result(res.records.map(rec => rec.get('p').properties)))
        .catch(err => error(err))
        .then(() => session.close())
}

exports.followUser = async (users, result, error) => {
    const session = driver.session()

    session.run(`MATCH (u:Person{UserName: $myUserNameParam}),(bu:Person{UserName: $outherUsername})
                 MERGE (u)-[:Follow]->(bu)
                 RETURN *`, {
        myUserNameParam: users.me,
        outherUsername: user.userNameToFollow
    })
        .then(res => result(res))
        .catch(err => error(err))
        .then(() => session.close())
}

