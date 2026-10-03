import mongoose from "mongoose";
import config from "./config.js";

export async function ConnectDB() {
    try {
        await mongoose.connect(config.MONGODB_URI)
        console.log("DB Connection Successfully ✅.");
        
    } catch (error) {
        console.log("DB Connection Failed ❌.");
        console.log(error.message);
    }
}