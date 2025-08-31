import mongoose from "mongoose";

export interface ITask extends mongoose.Document {
    userId: string;
    title: string;
    description: string;
    status: "PENDING" | "COMPLETED";
}

const taskSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
