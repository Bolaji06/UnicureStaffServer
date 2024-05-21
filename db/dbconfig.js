require("dotenv").config();

const pgp = require("pg-promise")();

// make a database connection
const configObj = {
  host: process.env.POSTGRES_HOSTNAME,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DATABASE,
  user: "dbunicurestaff_user",
  password: process.env.POSTGRES_PASSWORD,
  max: Number(process.env.POOL_COUNT),
  ssl: true,
};
const db = pgp(configObj);

module.exports = db;
