import mongoose from "mongoose"

process.loadEnvFile()

const URI_DB = process.env.URI_DB || ""

const connectDB = async () =>{
    try{
        await mongoose.connect(URI_DB)
        console.log("MongoDB connected")

    }catch (error){
        console.log("MongoDB connection error")
    }
}
export {connectDB}