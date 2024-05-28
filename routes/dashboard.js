
const express = require("express");
const router = express.Router();
const { authenticate } = require('../utils/auth')

router.get('/dashboard', authenticate, (req, res) => {
    res.send("You have access");
    console.log(req.user);
});

router.get('/protected', (req, res) => {
    res.send('This is a protected routes')
})

module.exports = router