const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser")
const userRouter = require('./Routes/UserRouter')
const socialrouter = require('./Routes/SocialRouter')
const port = process.env.PORT || 3000
const morgan = require('morgan')
const app = express()

app.use(cors());
app.use(bodyParser.json())
if (app.get('env') === 'development') {
    console.log('using morgan')
    app.use(morgan('tiny'))
}

app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/api/user', userRouter)
app.use('/api/social', socialrouter)

app.listen(port, () => {
    console.log(`server is working on port ${port}`)
})