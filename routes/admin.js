const express = require('express');
const prisma = require('../utils/prismaClient')

const router = express.Router();

router.get('/admins', async (req, res) => {
    const admin = await prisma.admin.findMany();
    res.status(200).json(admin);  
   // console.log(process.)
});

router.get('/cookie', (req, res) => {
    console.log(req.signedCookies);
})


module.exports = router