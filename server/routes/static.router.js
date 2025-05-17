const express = require('express')
const jwt = require('jsonwebtoken');
const User = require('../models/auth.model');


const staticRouter = express.Router()

staticRouter.get('/home', async (req, res) => {
    const username = req.query.user;

    if (!username) {
        return res.end();
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(200).json({ exists: false, message: "User Unauthorized" });
        }

        return res.status(200).json({ exists: true, message: "User authorized" });
    } catch (err) {
        console.error("Error checking user:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});


staticRouter.post("/logout", (req, res) => {
    res.clearCookie("authToken");
    res.json({ message: "Logged out successfully" });
});



module.exports = staticRouter