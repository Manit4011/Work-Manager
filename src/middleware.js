import { NextResponse } from "next/server";

export function middleware(request){
    console.log("Middleware is running");
    const authToken = request.cookies.get('authToken')?.value;
    console.log("Auth token:", authToken);

    // If the request is for the login, signup, or logout API endpoints, allow it to pass through
    // This is to prevent the middleware from blocking the login and signup requests
    // Also allow the logout request to pass through so that it can clear the auth token cookie
    if (request.nextUrl.pathname ==="/api/login" || request.nextUrl.pathname === "/api/users" || request.nextUrl.pathname === "/api/logout"){
        return
    }

    //if user is logged in, then he should not be able to access the login and signup pages
    const loggedInUserNotAccessPaths = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup";

    if (loggedInUserNotAccessPaths){
        if (authToken){
            return NextResponse.redirect(new URL('/profile/user', request.url));
        }
    }
    else{
        //if user is not logged in and trying to access any other page, then redirect him to the login page
        //if user is not logged in and trying to access any api, then return 401 status code with a message
        if (!authToken){
            if(request.nextUrl.pathname.startsWith("/api")){
                return NextResponse.json({
                    message:"Unauthorized access. Please login to continue.",
                    success: false
                },{
                    status: 401
                })
            }

            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
}


// the below config is used to check on which paths the middleware should run
export const config = {
    matcher: [
        '/',
        '/add-task',
        '/login',
        '/signup',
        '/profile/:path*',
        '/profile/user/:path*',
        '/show-task',
        '/api/:path*',
    ]
}