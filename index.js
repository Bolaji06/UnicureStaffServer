const express = require("express");
const staffRoutes = require("./routes/staffRoutes");
const registration = require("./routes/registration");
const admin = require("./routes/admin");
const login = require("./routes/login");
const dashboard = require("./routes/dashboard");
const forgotten = require("./routes/forgotten");
const resetPassword = require("./routes/reset-password");

const app = express();

const PORT = 7000;

app.use(express.json());
app.use(staffRoutes);
app.use(registration);
app.use(admin);
app.use(login);
app.use(dashboard);
app.use(forgotten);
app.use(resetPassword);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept"
  );
  //console.log(req.signedCookies);
  next();
});

app.listen(PORT, () => {
  console.log("Server running..." + PORT);
});
