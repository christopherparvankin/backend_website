import createClient from "../db/connection.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try{
  console.log("recieved get request");
  var client = createClient();
  await client.connect();
  const r = await client.query('SELECT * FROM scores;');
  await client.end();
  res.send(r.rows).status(200);
  }
  catch (err){
    console.log(err);
    res.status(500).send("error");
  }
  finally {
    await client.end();
  }
});

router.patch("/", async (req, res) => {
    try {
    console.log("patch request made");
    const { oldID, newPlayer, newScore } = req.body;
    console.log(req.body);
    var client = createClient();
    await client.connect();
    const r = await client.query(`UPDATE scores SET username = '${newPlayer}', score = ${newScore} WHERE id = '${oldID}'`);
    res.status(200).send("updated successfully");
  }
  catch (err) {
    console.error(err);
    res.status(500).send("error");
  } finally {
    await client.end();
  }
  }
);

export default router;