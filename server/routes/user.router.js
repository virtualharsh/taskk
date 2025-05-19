const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/auth.model"); // Adjust path as needed

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

module.exports = router;
