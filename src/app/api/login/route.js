// this is a login api

import { User } from "@/lib/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ConnectDB from "@/lib/db";

const loadDB = async () => {
    await ConnectDB();
}

loadDB();

export async function POST(request){
    const {email, password} = await request.json(); // we  provide email and password in the request
    try {
        // Check if a user with the same email exists
        const existingUser = await User.findOne({
            email
        });
        if (!existingUser) {
            return NextResponse.json({
                message: "User not found",
                status: "error"
            }, { status: 404 }); // 404 = Not Found
        }
        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password); // comparing the provided password with the hashed password in the database
        if (!isPasswordCorrect) {
            return NextResponse.json({
                message: "Incorrect password",
                status: "error"
            }, { status: 401 }); // 401 = Unauthorized
        }
        // Generate a JWT token
        // token is genrated using the user's id and a secret key
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        // Set the token in a cookie
        const res = NextResponse.json({
            message: "Login successful",
            status: "success",
            token
        });
        
        //saving the token in a cookie
        // httpOnly = true means that the cookie cannot be accessed by JavaScript, only by the server
        // secure = true means that the cookie will only be sent over HTTPS, not HTTP

        res.cookies.set("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 // 1 hour
        });
        return res;
        
    } catch (error) {
        return NextResponse.json({
            message: "Error logging in",
            status: "error",
            error: error.message
        })
        
    }
}