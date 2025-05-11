const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/auth.model');

const checkExistingMail = async (req, res) => {
    
};

const checkExistingUserName = async (req, res) => {
    
};

const addUser = async (req, res) => {
    
};

const verifyOTP = async (req, res) => {
    
};

const resendOTP = async (req, res) => {
    
};

const checkUser = async (req, res) => {
    
};

// Export all controller functions correctly
module.exports = {
    checkExistingMail,
    checkExistingUserName,
    checkUser,
    addUser,
    resendOTP,
    verifyOTP,
};