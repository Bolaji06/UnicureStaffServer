const express = require('express');
const prisma = require('../utils/prismaClient')

const router = express.Router();

router.get('/admins', async (req, res) => {
    const admin = await prisma.admin.findMany();
    res.status(200).json(admin);  
   // console.log(process.)
});

router.delete("/admin/delete", async (req, res) => {
    const { email } = req.body;
    try {
      await prisma.admin.delete({
        where: {
          email: email,
        },
      });
      res.status(200).json({ success: true, message: "admin deleted success" });
    } catch (err) {
      if (err.code === "P2025") {
        res.status(404).json({ success: false, message: "admin not found" });
      } else {
        res
          .status(500)
          .json({
            success: false,
            message: "encounter error while deleting admin",
          });
      }
      console.log(err);
    } 
  });
  

router.get('/cookie', (req, res) => {
    console.log(req.signedCookies);
})


module.exports = router