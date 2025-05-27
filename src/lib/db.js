import mongoose from "mongoose";
const ConnectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName: process.env.DATABASE_NAME
        })
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Error in database connection", error.message)
    }
}
export default ConnectDB