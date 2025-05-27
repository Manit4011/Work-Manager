import ConnectDB from "@/lib/db"
import { Task } from "@/lib/models/taskModel"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const loadDB = async () => {
    await ConnectDB()
}
loadDB()

export async function GET(request) {
    // fetch all tasks from the database
    try {
        const tasks = await Task.find()
        return NextResponse.json(tasks)
    } catch (error) {
        return NextResponse.json({
            message: "Tasks not found",
            status: "error",
            error: error.message
        })
    }
}

export async function POST(request) {
    const { title, content, userId, status } = await request.json()

    const authToken = request.cookies.get("authToken")?.value; // to get authToken from cookies
    const data = jwt.verify(authToken, process.env.JWT_SECRET); // to get data from verifying auth token
    // create task in the database
    try {
        const newTask = new Task({
            title,
            content,
            userId: data.id, // as here data.id provides us the userId
            status
        })
        await newTask.save()
        return NextResponse.json({
            message: "Task Created",
            status: "success"
        })
    } catch (error) {
        return NextResponse.json({
            message: "Task not created",
            status: "error",
            error: error.message
        })
    }
}