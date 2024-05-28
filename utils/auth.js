
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token){
        return res.status(402) // unauthorize
    }

    jwt.verify(token, "secret", (err, user) => {
        if (err){
            res.status(403) // auth forbidden
        };

        req.user = user;
        next()
    })
}