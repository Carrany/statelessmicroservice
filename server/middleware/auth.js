const jwt = require('jsonwebtoken');
require('dotenv').config();


function auth(req, res, next) {
    const token = req.header('bearer');

    //Check for token
    if (!token)
        return res.status(401).json({ message: "Access denied, Please login to continue" })

    try {
        // Verify Token
        const decoded = jwt.verify(token, process.env.jwtSecret);

        // Add user from payload
        req.user = decoded
        next();

    } catch (error) {
        res.status(400).json({ message: "Invalid Token" })
    }

}

module.exports = auth;