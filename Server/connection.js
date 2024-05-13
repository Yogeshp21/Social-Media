const mongoose = require('mongoose')

module.exports = async () => {
    const dbUri = process.env.MONGODB_URI
    try {
        await mongoose.connect(dbUri)
        console.log("MongoDB is connected")
    }
    catch (error) {
        console.log("MongoDB connection error", error)
        process.exit(1);
    }
}