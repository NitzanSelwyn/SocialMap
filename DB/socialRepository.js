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

