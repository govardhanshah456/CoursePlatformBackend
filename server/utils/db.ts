import mongoose from "mongoose";
require("dotenv").config();

const dbUrl = process.env.DB_URL || '';

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl).then((data:any)=>{
            console.log(`DB COnnected with:${data.connection.host}`);
        })
    } catch (error:any) {
        console.log(error.message)
    }
}

export default connectDB;