
const crypto = require('node:crypto');

function generateResetToken(){
    const token = crypto.randomBytes(10).toString('hex');
    const expiry = new Date(Date.now() + 3600000)
    return {
        token,
        expiry
    }
}

module.exports = generateResetToken