const connectToMongo = require('./db');
connectToMongo();           //connection to mongodb

const express = require('express')
var cors = require('cors');  //to remove cors error from chrome console
const app = express()       //to use express
const port = 5000           //assigning port to backend

app.use(cors())             //using cors to remove error from chrome console
app.use(express.json());  //middleware to use request.body
// available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use('/', (req, res) => { res.send('Success. Backend working') })

app.listen(port, () => {
    console.log(`iNotebook backend listening on port ${port}`)
})