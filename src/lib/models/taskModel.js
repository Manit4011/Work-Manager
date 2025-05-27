import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    addedDate:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        enum:["pending", "completed"],
        default:"pending"
    },
    userId:{
        //this is used to link the task to a user
        type:mongoose.ObjectId,
        required:true
    }
},{timestamps:true})
export const Task = mongoose.models.tasks || mongoose.model("tasks", TaskSchema);