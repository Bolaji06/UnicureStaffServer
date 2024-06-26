const express = require("express");
const { checkSchema, validationResult } = require("express-validator");
const { forgotten } = require("../utils/validation");

const prisma = require('../utils/prismaClient')
const sendEmail = require("../utils/sendEmail");
const {generateResetToken} = require("../utils/generateToken");

const router = express.Router();


router.post("/forgotten", checkSchema(forgotten), async (req, res) => {
  const { email } = req.body;

  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.send(result.array());
  }
  try {
    // check if there is email in database
    const user = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "no user with this email" });
    }

    const { token, expiry } = generateResetToken();
    await prisma.admin.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: token,
        resetPasswordExpiry: expiry,
      },
    });

    const subject = "Verify email for password reset";
    const message =
      "You\'re receiving this message because you're about to reset your password";
    const html = ` <h3>Click on the verification button below</h3>
        <a href="http://localhost:3000/reset-password?token=${token}">
          <button>Verify Email</button>
        </a>`;
    sendEmail(email, subject, message, html);
    res.status(200).json({ success: true, message: "email sent" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
