require("dotenv").config();

const express = require("express");
const pgp = require("pg-promise")();
const {
  query,
  param,
  validationResult,
  checkSchema,
} = require("express-validator");
const {
  selectByCardNumber,
  selectAllStaff,
  queryByFirstName,
  addPersonalInfoQuery,
  addWorkInfoQuery,
  countRows,
} = require("./utils/queries");
const {
  queryValidation,
  paramValidation,
  addPersonalInfoValidation,
} = require("./utils/validation");

const app = express();
//make database connection
const configObj = {
  host: process.env.POSTGRES_HOSTNAME,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DATABASE,
  user: "dbunicurestaff_user",
  password: process.env.POSTGRES_PASSWORD,
  max: Number(process.env.POOL_COUNT),
  ssl: true,
};
const PORT = 7000;

const db = pgp(configObj);

app.use(express.json());

app.use("/staff/all", async (req, res, next) => {
  try {
    const result = await db.any(countRows);
    //console.log(result);
    req.result = result;
    next();
  } catch (err) {
    console.log(err);
  }
});

// get all staff endpoint
app.get("/staff/all", async (req, res) => {
  res.type("application/json");

  try {
    const response = await db.any(selectAllStaff);
    res.status(200).json(response);
    const { count } = req.result[0];
    console.log(parseInt(count));
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err);
  }
});

//get staff by card_number (/staff/card_number)
app.get(
  "/staff/:card_number",
  checkSchema(paramValidation),
  async (req, res) => {
    const { card_number } = req.params;

    const result = validationResult(req);

    console.log(card_number);
    try {
      const response = await db.any(selectByCardNumber, [card_number]);
      const vRes = response.filter(
        (item) => item.card_number.toLowerCase() === card_number
      );
      if (result.isEmpty()) {
        if (vRes.length !== 0) {
          res.status(200).json(vRes);
        } else {
          res.status(404).json({ error: "Not Found" });
        }
      } else {
        res.status(400).json({ error: "Bad Request" });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(err);
    }
  }
);

// query staff by card_number (/staff?card_number=card_number)
app.get("/staff", checkSchema(queryValidation), async (req, res) => {
  const { card_number } = req.query;

  const result = validationResult(req);

  try {
    const response = await db.any(queryByFirstName, [card_number]);

    const filter = response.filter(
      (value) => value.card_number.toLowerCase() === card_number
    );
    if (result.isEmpty()) {
      if (filter.length !== 0) {
        res.status(200).json({ response });
      } else {
        res.status(404).json({ error: "Not Found" });
      }
    } else {
      res.status(400).json({ error: result.array() });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err);
  }
});

// add staff personal_info to database (/staff/add/personal_info)
app.post(
  "/staff/add/personal_info",
  checkSchema(addPersonalInfoValidation),
  async (req, res) => {
    const {
      first_name,
      last_name,
      home_address,
      phone_number,
      gender,
      profile_image,
      next_of_kin,
      emergency_contact,
    } = req.body;

    const result = validationResult(req);

    try {
      if (result.isEmpty()) {
        await db.oneOrNone(addPersonalInfoQuery, [
          first_name,
          last_name,
          home_address,
          phone_number,
          gender,
          profile_image,
          next_of_kin,
          emergency_contact,
        ]);
        res.status(201).json({success: 'User Created'});
      }else{
        res.status(400).json(result.array());
      }
    } catch (err) {
      console.log(err);
    }
  }
);

// get the total number of records in personal_info table
app.use("/staff/add/work_info", async (req, res, next) => {
  try {
    const result = await db.any(countRows);
    req.result = result;
    next();
  } catch (err) {
    console.log(err);
  }
});
// add staff work_info to database (/staff/add/work_info)
app.post("/staff/add/work_info", async (req, res) => {
  const {
    personal_info_id,
    department,
    job_title,
    date_hired,
    account_number,
    email,
    card_number,
    position_status,
    approved,
    salary,
  } = req.body;

  // to avoid manually adding of personal_info_id in work_info
  // i need to get the total number of records in personal_info table
  // i need to increment the length of the record in personal_info table when i add new staff

  const { count } = req.result[0];
  let parseCount = count && parseInt(count);
  try {
    //const count = await db.any(countRows)

    const createWorkInfo = await db.none(addWorkInfoQuery, [
      parseCount + 1,
      department,
      job_title,
      date_hired,
      account_number,
      email,
      card_number,
      position_status,
      approved,
      salary,
    ]);
    res.status(201).json(createWorkInfo);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log("Server running..." + PORT);
});
