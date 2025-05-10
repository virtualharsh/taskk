const express = require('express')
const { addUser, checkUser } = require('../controllers/auth.controller')

const authRouter = express.Router()

const checkAuth = (req, res, next) => {
    next()
}

authRouter.post('/signup', addUser);

authRouter.post('/login', checkAuth, checkUser);

module.exports = authRouter