
const express = require('express');
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.get('/admins', async (req, res) => {
    const admin = await prisma.admin.findMany();
    res.status(200).json(admin);   
})


module.exports = router