//this route is made to update and delete a particular task
import { Task } from "@/lib/models/taskModel"
import { NextResponse } from "next/server"
import ConnectDB from "@/lib/db"


const loadDB = async () => {
    await ConnectDB()
}
loadDB()
export async function GET(request, {params}) {
    const {taskid} = await params
    // fetch task from the database
    try {
        const task = await Task.findById(taskid)
        return NextResponse.json(task)
    } catch (error) {
        return NextResponse.json({
            message:"Task not found",
            status:"error",
            error:error.message
        })
        
    }
}


export async function DELETE(request, {params}) {
    const {taskid} = await params
    // delete task from the database
    try {
        await Task.findByIdAndDelete(taskid)
        return NextResponse.json({
            message:"Task Deleted",
            status:"success"
        })
    } catch (error) {
        return NextResponse.json({
            message:"Task not deleted",
            status:"error",
            error:error.message
        })
        
    }
    
}

export async function PUT(request, {params}) {
    const {taskid} = await params
    // fetch task details from request
    const { title,content,status,userId } = await request.json()
    // update task in the database
    try {
        await Task.findByIdAndUpdate(taskid,{
            title,
            content,
            status,
        })
        return NextResponse.json({
            message:"Task Updated",
            status:"success"
        })
    } catch (error) {
        return NextResponse.json({
            message:"Task not updated",
            status:"error",
            error:error.message
        })
        
    }
    
}