const mongoose = require("mongoose")

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB)
        console.log("Mongo connected successfully.")
    }
    catch(err){
        console.log("Mongo connected failed: ", err)
    }
}

module.exports = connectDB