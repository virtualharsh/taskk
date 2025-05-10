const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/auth.model');

const addUser = async (req, res) => {
    try {
        const { email, username ,password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username , email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const checkUser = async (req, res) => {
    try {
        const { mail, password } = req.body;

        const user = await User.findOne({ mail });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set Cookie with Proper Options
        res.cookie("authToken", token, {
            httpOnly: true,  // Prevents client-side JS from accessing the cookie
            secure: process.env.NODE_ENV === "production", // Use `true` in production (HTTPS required)
            sameSite: "lax", // Helps with CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({ message: "User Authenticated" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


module.exports = { addUser, checkUser }