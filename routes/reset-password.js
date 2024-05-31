const { PrismaClient } = require("@prisma/client");
const express = require("express");
const bcrypt = require("bcrypt");
const { checkSchema, validationResult } = require("express-validator");
const { resetPassword } = require("../utils/validation");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/reset", checkSchema(resetPassword), async (req, res) => {
  const { token, newPassword } = req.body;

  const result = validationResult(req);

  if (!result.isEmpty()){
    res.status(400).json(result.array());
  }
  try {
    const user = await prisma.admin.findUnique({
      where: {
        resetPasswordToken: token,
      },
    });

    if (!user || user.resetPasswordExpiry < new Date()) {
      res
        .status(400)
        .json({ success: false, message: "invalid token or token expiry" });
    }
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    await prisma.admin.update({
        where: {
            id: user.id
        },
        data: {
            password: hashPassword,
            resetPasswordToken: null,
            resetPasswordExpiry: null,
        }
    });
    res.status(200).json({ success: true, message: "password reset successful" })

    await prisma.$disconnect();
  } catch (err) {
    console.log(err);
    res.statusCode(500)
    await prisma.$disconnect();
    process.exit(1);
  }
});

module.exports = router;
