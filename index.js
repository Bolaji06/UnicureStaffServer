require("dotenv").config();

const express = require("express");
const pgp = require("pg-promise")();
const { selectByCardNumber, selectAllStaff, queryByFirstName } = require("./utils/queries");

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

//get all staff endpoint
app.get("/staff/all", async (req, res) => {
  res.type("application/json");

  try {
    const response = await db.any(selectAllStaff);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({error: 'Internal Server Error'});
    console.log(err);
  }
});

//get staff by card_number
app.get("/staff/:cardId", async (req, res) => {
  const { cardId } = req.params;
  console.log(cardId);
  res.type("application/json");
  try {
    const response = await db.any(selectByCardNumber, [cardId]);
    const vRes = response.filter((item) => item.card_number === cardId);
    if (!vRes){
        return res.status(400).json({error: "Bad Request"});
    }else{
         res.status(200).json(vRes);
    }
   
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err);
  }
});

// get user by firstName query
app.get('/staff', async (req, res) => {
    try{
      const { firstname } = req.query
    
      const formatQuery = firstname.trim().toLowerCase();

      const response = await db.any(queryByFirstName, [formatQuery]);

      const filter = response.filter((value) => value.first_name.toLowerCase() === formatQuery);
      if (filter.length !== 0){
        res.status(200).json({ response })
      }
      else {return res.status(404).json({ error: "Not Found"})};

    }catch(err){
        res.status(500).json({error: "Internal Server Error"})
        console.log(err);
    }
})

app.listen(PORT, () => {
  console.log("Server running..." + PORT);
});
