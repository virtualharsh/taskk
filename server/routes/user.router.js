const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/auth.model");
const bcrypt = require("bcryptjs");

const router = express.Router();

// GET /user/:username - protected route
router.get("/:username", authMiddleware, async (req, res) => {
    const { username } = req.params;

    if (username !== req.user) {
        return res.status(403).json({ message: "Forbidden: Access denied", redirect: true });
    }

    try {
        const user = await User.findOne({ username }).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ avatar: user.avatar, username: user.username });
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ message: "Server Error" });
    }
});

router.put("/changepassword", authMiddleware, async (req, res) => {
    // console.log("changepassword hit");
    // console.log("req.user:", req.user);
    // console.log("req.body:", req.body);

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        console.log("Missing fields");
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ username: req.user });
        // console.log("Found user:", user?.username);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect current password" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
        console.error("Error changing password:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});




module.exports = router;
