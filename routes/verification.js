const express = require("express");
const prisma = require('../utils/prismaClient')
const router = express.Router();

router.post("/verify-email", async (req, res) => {
  const { token } = req.body;
  try {
    const user = await prisma.admin.findUnique({
      where: {
        verificationEmailToken: token,
      },
    });

    if (user) {
      await prisma.admin.update({
        where: {
            id: user.id
        },
        data: {
            verificationEmailToken: null,
        }
      });
      res.status(200).json({ success: true, message: "email verified" });
    }else{
        res.status(404).json({ success: false, message: 'user not found or invalid token' })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'fail to verify email' })
  }
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

module.exports = router;
