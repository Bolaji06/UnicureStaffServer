const express = require("express");
const router = express.Router();
const db = require("../db/dbconfig");
const {
  selectByCardNumber,
  selectAllStaff,
  queryByFirstName,
  addPersonalInfoQuery,
  addWorkInfoQuery,
  countRows,
  updateCardNumber,
  updatePersonalInfoQuery,
} = require("../utils/queries");

const { checkSchema, validationResult } = require("express-validator");
const {
  queryValidation,
  paramValidation,
  addPersonalInfoValidation,
  addWorkInfoValidation,
} = require("../utils/validation");

// count total number of personal_info records
router.use("/staff/all", async (req, res, next) => {
  try {
    const count = await db.any(countRows);
    const parseCount = parseInt(count[0].count);
    console.log(parseCount);
    next();
  } catch (err) {
    console.log(err);
  }
});

// get all staff
router.get("/staff/all".trim(), async (req, res) => {
  res.type("application/json");

  try {
    const response = await db.any(selectAllStaff);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err);
  }
});

// get staff by card_number params (/staff/card_number)
router.get(
  "/staff/:card_number",
  checkSchema(paramValidation),
  async (req, res) => {
    const { card_number } = req.params;

    const result = validationResult(req);
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
router.get("/staff", checkSchema(queryValidation), async (req, res) => {
  const { card_number } = req.query;

  const result = validationResult(req);

  try {
    const response = await db.any(queryByFirstName, [card_number]);

    const filter = response.filter(
      (value) => value.card_number.toLowerCase() === card_number
    );
    if (result.isEmpty()) {
      if (filter.length !== 0) {
        res.status(200).json(response);
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

// add staff personal_info to table (/staff/add/personal_info)
router.post(
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
      email,
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
          email,
        ]);
        res.status(201).json({ success: true, message: "Staff Personal info created!" });
      } else {
        res.status(400).json(result.array());
        
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: true, message: "Failed to create staff!"})
      
    }
  }
);

// add staff work_info to table (/staff/add/work_info)
router.post(
  "/staff/add/work_info",
  checkSchema(addWorkInfoValidation),
  async (req, res) => {
    const {
      personal_info_id,
      department,
      job_title,
      date_hired,
      account_number,
      card_number,
      position_status,
      approved,
      salary,
    } = req.body;

    const result = validationResult(req);

    try {
      if (result.isEmpty()) {
        await db.none(addWorkInfoQuery, [
          personal_info_id,
          department,
          job_title,
          date_hired,
          account_number,
          card_number,
          position_status,
          approved,
          salary,
        ]);
        res.status(201).json({ success: true, message: "Work info Created" });
      } else {
        res.status(400).json(result.array());
      }
    } catch (err) {
      console.log(err);
    }
  }
);

/**
 * UPDATE your_table
SET column1 = new_value1, column2 = new_value2, column3 = new_value3
WHERE condition;
 */

// edit personal_info by card_number (/admin/p/card_number/edit)
router.patch("/admin/p/:card_number/edit", async (req, res) => {
  const { card_number } = req.params;
  const updatedFields = req.body;

  try {
    let query = `
      UPDATE personal_info AS p
      SET
      `;
    const values = [];
    let setClauses = [];
    Object.keys(updatedFields).forEach((key, _i) => {
      if (_i > 0) setClauses.push(",");
      setClauses.push(`${key} = $${_i + 1}`);
      values.push(updatedFields[key]);
    });
    query += setClauses.join(" ");
    query += `
        FROM 
          work_info AS w
        WHERE
          p.id = w.personal_info_id
          AND w.card_number = $${values.length + 1}
      `;
    values.push(card_number);
    const response = await db.oneOrNone(query, values);
    if (response) {
      res.status(200).json({ success: true, message: 'Update success' });
    } else {
      res.status(400).json({ success: false, message: "Failed to update" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    throw new Error(err);
  }
});

// edit  work_info details by card_number (/admin/w/:card_number/edit)
router.patch("/admin/w/:card_number/edit", async (req, res) => {
  const { card_number } = req.params;
  const updatedFields = req.body;

  try {
    let query = `
        UPDATE work_info AS w
        SET
      `;
    const values = [];
    let setClause = [];

    Object.keys(updatedFields).forEach((key, _i) => {
      if (_i > 0) setClause.push(",");
      setClause.push(`${key} = $${_i + 1}`);
      values.push(updatedFields[key]);
    });
    query += setClause.join(" ");
    query += `
        FROM personal_info AS p
        WHERE p.id = w.personal_info_id
        AND w.card_number = $${values.length + 1}
      `;
    values.push(card_number);
    const response = await db.oneOrNone(query, values);
    if (response){
      res.status(200).json({ message: 'Update success'});
    }else {
      res.status(400).json({ success: false, message: 'Fail to update'})
    } 
  } catch (err) {
    res.status(500).json({error: 'Internal Server Error'})
    throw new Error(err);
  }
});

// delete staff with card_number params (/staff/deleteRecord/:card_number)
router.delete("/staff/deleteRecord/:card_number", async (req, res) => {
  let { card_number } = req.params;
  card_number = card_number.toLowerCase();

  const deleteQuery = `
      DELETE FROM work_info WHERE card_number ILIKE $1;
      DELETE FROM personal_info WHERE id IN 
        (SELECT personal_info_id FROM work_info WHERE card_number ILIKE $1);
    `;
  try {
    const response = await db.query(deleteQuery, [card_number]);
    if (!response) res.status(400).json({ success: false, message: "Failed to delete record" });
    else {
      res.status(200).json({ success: true, message: 'Record deleted successfully' });
    }
    console.log(response);
    return response;
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error Ocurred' });
    throw new Error(err);
  }
});

module.exports = router;
