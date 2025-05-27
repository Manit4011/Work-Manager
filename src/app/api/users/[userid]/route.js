// this route can be used in the user profile page to manage his profile data like update, delete,etc.
import { User } from "@/lib/models/userModel"
import { NextResponse } from "next/server"
// this is a dynamic route

// get single user by id
export async function GET(request, {params}){
    const {userid} = await params
    // fetch user from the database
    try {
        const user = await User.findById(userid)
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({
            message:"User not found",
            status:"error",
            error:error.message
        })
    }
}

// delete user by id
export async function DELETE(request, {params}){
    const {userid} = await params
    // delete user from the database
    try {
        await User.findByIdAndDelete(userid)
        return NextResponse.json({
            message:"User Deleted",
            status:"success"
        })
    } catch (error) {
        return NextResponse.json({
            message:"User not deleted",
            status:"error",
            error:error.message
        })
    }
}

// update user by id
export async function PUT(request, {params}){
    const {userid} = await params
    // fetch user details from request
    const { name, email, password, about } = await request.json()
    // update user in the database
    try {
        await User.findByIdAndUpdate(userid,{
            name,
            email,
            password,
            about
        })
        return NextResponse.json({
            message:"User Updated",
            status:"success"
        })
    } catch (error) {
        return NextResponse.json({
            message:"User not updated",
            status:"error",
            error:error.message
        })
    }
}