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
module.exports = router;
