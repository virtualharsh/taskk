const express = require('express')
const { addUser, checkUser, setVerified, checkExistingMail, checkExistingUserName } = require('../controllers/auth.controller')
const {
    requestPasswordReset,
    resetPassword
} = require("../controllers/forgot.controller");
const authRouter = express.Router()


authRouter.post('/signup', addUser);
authRouter.post("/check-email", checkExistingMail);
authRouter.post("/check-username", checkExistingUserName);
authRouter.post('/login', checkUser);
authRouter.get('/verify/:id', setVerified);
authRouter.post("/forgot-password", requestPasswordReset);
authRouter.post("/reset-password/:userId", resetPassword);

module.exports = authRouter