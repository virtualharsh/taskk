const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    avatar:{
        type:String,
        default:"",
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
    isVerified: {
        type:Boolean,
        default:false,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;