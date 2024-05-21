const db = require('../db/dbconfig')


async function getStaffCount(req, res, next) {
  try {
    const count = await db.any(countRows);
    req.count = count;
    next();
  } catch (err) {
    console.log(err);
  }
}
module.exports = getStaffCount;
