import mongoose from "mongoose";
import envvars from "../contants/envvar";

export const connectDB = async () => {
    try {
        await mongoose.connect(envvars.MONGODB_URI, {
            dbName: "task-manager",
        });
        console.log("Database connected");
    } catch (error) {
        console.log("Error in connecting to database!", error);
        process.exit(1);
    }
};

export const disconnectDB = async () => await mongoose.disconnect();
