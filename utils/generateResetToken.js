
const crypto = require('node:crypto');

function generateResetToken(){
    const token = crypto.randomBytes(10).toString('hex');
    const expiry = new Date(Date.now() + 3600000)
    return {
        token,
        expiry
    }
}

function generateVerificationToken(){
    const token = crypto.randomBytes(10).toString('hex');
    return token;
}

module.exports = {
    generateResetToken,
    generateVerificationToken,
}