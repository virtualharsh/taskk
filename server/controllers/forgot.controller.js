const User = require("../models/auth.model");
const sendResetEmail = require("../utils/sendResetEmail");
const bcrypt = require("bcrypt");


const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    const CLIENT_URL = process.env.CLIENT_URL;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const expiry = Date.now() + 3600000; // 1 hour
    user.resetPasswordExpires = expiry;
    await user.save();

    // Simple reset link with only user ID
    const link = `${CLIENT_URL}/reset-password/${user._id}`;
    await sendResetEmail(email, link);

    res.status(200).json({ message: "Reset link sent to email" });
};

const resetPassword = async (req, res) => {
    const { userId } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
        _id: userId,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired link" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
};

module.exports = {
    requestPasswordReset,
    resetPassword,
};