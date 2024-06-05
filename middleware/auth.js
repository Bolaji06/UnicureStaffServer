
const jwt = require('jsonwebtoken');
const ms = require("ms");


exports.authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token){
        return res.sendStatus(401) // unauthorize
    }

    // if (token){
    //     res.cookie("user", token, { maxAge: ms("2 days"), signed: true })
    // }

    // verify the token: the verified token returns an object of user payload info
    jwt.verify(token, "secret", (err, user) => {
        if (err){
            console.log(err);
            res.sendStatus(403) // auth forbidden
        };
        req.user = user;
        next()
    })
}