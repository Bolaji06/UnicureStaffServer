const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.use(express.json());
app.use(cookieParser("user"));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Method", "POST, PUT, PATCH, DELETE");
//   res.setHeader(
//     "Access-Control-Allow-Header",
//     "Origin, X-Request-With, Content-Type, Accept"
//   );
//   next();
// });

const dbUser = [
  {
    user: "Mary",
    password: 1234,
  },
  {
    user: "Daniel",
    password: 6789,
  },
];
app.use(
  session({
    secret: "user-login",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
      signed: true,
    },
  })
);
app.use("/index", (req, res, next) => {
  console.log(req.session);
  next();
});
app.get("/index", (req, res) => {
  if (req.session.user) {
    res.send("Welcome to the homepage " + req.session.user);
  } else {
    res.redirect(302, "/logpage");
  }
});

app.get("/logpage", (req, res, next) => {
  res.send("Please Login");
  next();
});

app.post("/login", (req, res) => {
  const { user, password } = req.body;
  dbUser.forEach((item) => {
    if (item.user === user && item.password === password) {
      req.session.user = user;
      req.session.password = password;
      res.status(201).json({ success: true });
    } else {
      //res.status(400).json({ success: "Invalid Credentials" });
    }
  });
});

app.get("/logout", (req, res) => {
  res.send("Hate to see you leave " + req.session.user);
  req.session.destroy((err) => {
    if (err) console.log(err);
  });
});

app.listen(2000, () => {
  console.log("Server running...2000");
});
