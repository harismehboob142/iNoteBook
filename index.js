const connectToMongo = require('./db');
connectToMongo();

const express = require('express')
const app = express()
const port = 5000
app.use(express.json());  //middleware to use request.body
// available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use('/', (req, res) => { res.send('Success') })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})