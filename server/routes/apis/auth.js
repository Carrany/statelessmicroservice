const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

router.post('/', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Please insert all fields" })
    }

    jwt.sign(
        { username },
        process.env.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
            if (err) throw err;
            req.headers['bearer'] = token;
            res.status(200).json({ token, user: username, authorized: true, message: "Log In successful" })
        })

})

module.exports = router