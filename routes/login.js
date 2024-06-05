const express = require("express");
const { checkSchema, validationResult } = require("express-validator");
const { adminLogin } = require("../utils/validation");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const session = require("express-session");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/admin-login", checkSchema(adminLogin), async (req, res) => {
  const { username, password } = req.body;
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json(result.array());
  }
  try {
    const admin = await prisma.admin.findMany({
      where: {
        username: username,
      },
    });
    if (!admin.length) {
      return res
        .status(400)
        .json({ success: false, message: "user does not exists" });
    }
    const dbPassword = admin[0].password;
    const dbEmail = admin[0].email;
    const validatePassword = await bcrypt.compare(password, dbPassword); // return boolean
    const validateUsername = username === admin[0].username;
    const payload = {
      username: username,
      email: dbEmail,
    };

    if (validateUsername && validatePassword) {
      const token = jwt.sign(payload, "secret", { expiresIn: "2 days" }); // generate token id
      res.status(200).json({
        success: true,
        token: token,
        message: "user credentials are valid",
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "username or password is invalid" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    throw new Error(err);
  }
});

module.exports = router;
