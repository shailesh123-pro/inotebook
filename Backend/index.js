const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000


app.use(cors())

app.use(express.json()) // if you want to display your body contant of thunder-client the used this syntax
//Available routes
app.use('/api/auth',require('./routes/auth'))  // this is my auth routes
app.use('/api/notes',require('./routes/notes'))  // this is my notes routes

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
  
})