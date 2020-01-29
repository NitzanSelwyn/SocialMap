const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser")
const userRouter = require('./Routes/UserRouter')
const port = process.env.PORT || 3000

const app = express()
app.use(cors());
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/api/user', userRouter)

app.listen(port, () => {
    console.log(`server is working on port ${port}`)
})