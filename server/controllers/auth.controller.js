const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/auth.model');
const mongoose = require('mongoose');
const sendVerificationEmail = require("../utils/sendVerificationEmail");


const checkExistingMail = async (req, res) => {
    try {
        const email = req.body.email || "";

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }

    } catch (error) {
        console.error("Error checking email:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

const checkExistingUserName = async (req, res) => {
    try {
        const username = req.body.username || "";

        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }

    } catch (error) {
        console.error("Error checking email:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const addUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOtp();

        const randomId = Math.floor(Math.random() * 1000000);
        const avatarURL = `https://robohash.org/${randomId}?set=set3&bgset=bg0&size=200x200`;


        const newUser = new User({ email, username, password: hashedPassword, avatar: avatarURL });

        const result = await newUser.save();

        console.log(result._id);

        await sendVerificationEmail(email, result._id);

        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


const setVerified = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.json({ message: "Not found" });
        }

        const result = await User.findOneAndUpdate(
            { _id: id },
            { isVerified: true },
            { new: true }
        );

        if (!result) {
            return res.json({ message: "Not found" });
        }

        // Redirect to React login page (adjust URL as needed)
        res.redirect("https://taskk-1-16pw.onrender.com/");

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};



const checkUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            $or: [
                { email: email },
                { username: email }
            ]
        });


        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        if (!user?.isVerified) {
            return res.status(403).json({ message: "Please verify your account before login" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // res.cookie("authToken", token, {
        //     httpOnly: true,
        //     secure: true,           // Required for sameSite: "none"
        //     sameSite: "none",       // Required for cross-site cookies
        //     maxAge: 7 * 24 * 60 * 60 * 1000,
        // });



        // Avatar cookie — must NOT be httpOnly if you want frontend access
        // console.log(user.avatar);

        // res.cookie("avatarUrl", user.avatar , {
        //     httpOnly: false, 
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: "lax",
        //     maxAge: 7 * 24 * 60 * 60 * 1000,
        // });

        res.status(200).json({ message: "User validated", token,avatar:user.avatar });

    } catch (err) {
        console.error("Error checking user:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};



module.exports = {
    checkExistingMail,
    checkExistingUserName,
    checkUser,
    addUser,
    setVerified,
};
