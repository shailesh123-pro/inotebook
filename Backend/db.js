const mongoose = require('mongoose')

const mongoURI = "mongodb://0.0.0.0:27017/inotebook"

const connectToMongo = async ()=>{
    try{
        await mongoose.connect(mongoURI)
        console.log("connection successfull")
    }
    catch(err)
    {
        console.log("failed to connect")
    }
}

module.exports = connectToMongo;