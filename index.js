const express = require("express")
const { connectToMongoDB } = require('./connect')

const app = express()
const urlRoute = require('./routes/url')

const PORT = 8002
connectToMongoDB("mongodb://localhost:27017/short-url")
.then(console.log('mongodb connected')
)

app.use(express.json())
app.use('/url', urlRoute)
app.listen(PORT, () => console.log(`server started at ${PORT}`))