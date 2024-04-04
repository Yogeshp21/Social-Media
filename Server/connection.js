const mongoose = require('mongoose')

module.exports = async () => {
    const dbUri = "mongodb+srv://yogesh:yogesh@cluster0.kq3d3hr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    try {
        await mongoose.connect(dbUri)
        console.log("MongoDB is connected")
    }
    catch (error) {
        console.log("MongoDB connection error", error)
        process.exit(1);
    }
}