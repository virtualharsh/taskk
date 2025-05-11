const express = require('express')
const { addUser, checkUser, verifyOTP, checkExistingMail, checkExistingUserName } = require('../controllers/auth.controller')

const authRouter = express.Router()

const checkAuth = (req, res, next) => {
    next()
}

authRouter.post('/signup', addUser);
authRouter.post('/verify-otp', verifyOTP);
authRouter.post("/check-email", checkExistingMail);
authRouter.post("/check-username", checkExistingUserName);
authRouter.post('/login', checkAuth, checkUser);

module.exports = authRouter