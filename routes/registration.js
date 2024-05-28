const express = require("express");
const router = express.Router();
const { PrismaClient, Prisma } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { checkSchema, validationResult } = require("express-validator");
const { adminRegistrationSchema } = require("../utils/validation");

const prisma = new PrismaClient();

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
        res.status(400).json({
          success: false,
          message: "username or email already exist ",
        });
        return;
      } else {
        // hash the password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hashPassword = await bcrypt.hash(password, salt);

        // create a new user
        try {
          await prisma.admin.create({
            data: {
              username: username,
              email: email,
              password: hashPassword,
            },
          });
          await prisma.$disconnect(); // disconnect after creating new user
          res.status(201).json({ success: true, message: "user created" });
        } catch (err) {
          res.status(500).json({ error: "Internal Server Error" });
          await prisma.$disconnect(); // disconnect from database if there after error
          console.log(e);
          process.exit(1);
        }
      }
    } else {
      res.status(400).json(result.array());
    }
  }
);

module.exports = router;
