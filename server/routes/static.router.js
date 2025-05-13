const express = require('express')
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

const staticRouter = express.Router()

staticRouter.get('/home',(req, res) => {
    const token = req?.headers?.token;

    if(!token){
        return res.end()
    }
    const user = jwt.decode(token)
    res.status(200).json({user:user.username})
});

staticRouter.post("/logout", (req, res) => {
    res.clearCookie("authToken");
    res.json({ message: "Logged out successfully" });
});



module.exports = staticRouter