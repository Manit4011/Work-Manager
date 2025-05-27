import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        
    },
    password:{
        type:String,
        required:true
    },
    about:{
        type:String,
    },
    ProfileUrl:{
        type:String,
        default:"https://imgs.search.brave.com/gPvg8UKuGd3Sqw8smymzYhUUELH4i-V3Ln_y7NyO_mQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vQm9GYkZJ/RHAzYm5JdWFRYWlk/bnIwZWhiLVBDTnVp/d3ZiNmhNTUlLX2JQ/dy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkz/ZDNjdS9jR1p3WjJW/bGEzTXVZMjl0L0wz/TjBZWFJwWXk5cGJX/Rm4vWlhNdloyOXJk/UzF3Wm5Bdi9kMlZp/Y0M5bmIydDFMWEJt/L2NDMHhNUzUzWldK/dw"
    }
},{timestamps:true},
);
export const User = mongoose.models.users || mongoose.model("users", UserSchema);