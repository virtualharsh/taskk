const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    avatar:{
        type:String,
        required:false,
        unique:true,
        trim:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    otp: String,
    otpExpires: Date,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;