const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        // get data
        const {name, email, password, role} = req.body;
        // check if user already exists
        const existingUser = await User.findOne({email});
        // if user already exists
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }
        // secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10); //two arguments (1. password to be hashed, 2. number of rounds to be hashed)
        }
        catch (e) {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing password'
            });
        }
        
        const user = await User.create({
            name, email, password: hashedPassword, role
        });
        
        return res.status(200).json({
            success: true,
            data: user,
            message: 'User created successfully'
        });
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered'
        })
    }
}

exports.login = async (req, res) => {
    try {
        // fetch data
        const {email, password} = req.body;
        // validation of email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the details carefully'
            })
        }
        // check if user is not registered
        let user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not registered'
            })
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        }
        // verify password and generate a JWT token
        if (await bcrypt.compare(password, user.password)) {
            let token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: '2h'
                }
            )
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000), //3 days
                httpOnly: true
            }
            res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'User logged in successfully'
            });

        }
        // passwords do not match
        else {
            return res.status(403).json({
                success: false,
                message: 'Password mismatch'
            })
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Login failed'
        })
    }
}