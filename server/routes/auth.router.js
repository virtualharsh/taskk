const express = require('express')
const { addUser, checkUser, setVerified, checkExistingMail, checkExistingUserName } = require('../controllers/auth.controller')

const authRouter = express.Router()

const checkAuth = (req, res, next) => {
    next()
}

authRouter.post('/signup', addUser);
authRouter.post("/check-email", checkExistingMail);
authRouter.post("/check-username", checkExistingUserName);
authRouter.post('/login', checkUser);
authRouter.get('/verify/:id',setVerified);

module.exports = authRouter