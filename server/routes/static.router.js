const express = require('express')
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

const staticRouter = express.Router()

staticRouter.get('/home', (req, res) => {    
    res.status(200).json({});
});

staticRouter.post("/logout", (req, res) => {
    res.clearCookie("authToken");
    res.json({ message: "Logged out successfully" });
});



module.exports = staticRouter