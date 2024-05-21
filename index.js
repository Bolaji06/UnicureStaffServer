const express = require("express");
const staffRoutes = require("./routes/staffRoutes");
const registration = require("./routes/registration");
const admin = require("./routes/admin");

const app = express();

const PORT = 7000;

app.use(express.json());
app.use(staffRoutes);
app.use(registration);
app.use(admin);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "POST, PUT, PATCH, DELETE");
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin, X-Request-With, Content-Type, Accept"
  );
  next();
});


app.listen(PORT, () => {
  console.log("Server running..." + PORT);
});
