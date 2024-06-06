const express = require("express");
const router = express.Router();
const prisma = require("../utils/prismaClient");
const bcrypt = require("bcrypt");
const { checkSchema, validationResult } = require("express-validator");
const { adminRegistrationSchema } = require("../utils/validation");
const { generateVerificationToken } = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

router.post(
  "/register-admin",
  checkSchema(adminRegistrationSchema),
  async (req, res) => {
    const { email, username, password } = req.body;
    const result = validationResult(req);

    const isUser = await prisma.admin.findMany({
      where: {
        OR: [
          {
            username: username,
          },
          {
            email: email,
          },
        ],
      },
    });
    //console.log(isUser);

    if (result.isEmpty()) {
      // if username and email already exists
      if (isUser.length) {
        return res.status(400).json({
          success: false,
          message: "username or email already exist ",
        });
      } else {
        // hash the password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hashPassword = await bcrypt.hash(password, salt);
        const token = generateVerificationToken();

        const subject = "Verify your email";
        const message = "Kindly verify your email";
        const html = ` <h3>Click on the verification button below</h3>
        <a href="https://localhost:7000/verify-email?token=${token}">
          <button>Verify Email</button>
        </a>`;

        // create a new user
        try {
          await prisma.admin.create({
            data: {
              username: username,
              email: email,
              password: hashPassword,
              verificationEmailToken: token,
            },
          });

          sendEmail(email, subject, message, html);
          res.status(201).json({ success: true, message: "verify email" });
        } catch (err) {
          res.status(500).json({ error: "Internal Server Error" });
          console.log(err);
        }
      }
    } else {
      res.status(400).json(result.array());
    }
  }
);

module.exports = router;
