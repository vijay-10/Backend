// auth, isStudent, isAdmin

const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    // next is used to navigate to the next middleware after completion of the current middleware
    try {
        // extract JWT token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        // accessing thrugh body is less secure
        // accessing using header is considered the most secured way
        // header contains key and value
        // key: "Authorization", value: "Bearer token"

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token not found'
            })
        }

        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch (err) {
            res.status(401).json({
                success: false,
                message: 'Token is invalid'
            })
        }

        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}

exports.isStudent = (req, res, next) => {
    try{
        // req.user from line-24
        if (req.user.role !== 'Student') {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for students'
            });
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'User role is not matching'
        });
    }
}

exports.isAdmin = (req, res, next) => {
    try{
        // req.user from line-24
        if (req.user.role !== 'Admin') {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for admin'
            });
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'User role is not matching'
        });
    }
}