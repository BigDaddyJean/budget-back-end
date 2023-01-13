require("dotenv").config();
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Model = require("./model/Transaction");
const cors = require("cors")
const app = express();


mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to the DB"))
  .catch((err) =>
    console.error("Error while connecting to the database: ", err)
  );

app.use(cors({origin: process.env.FRONT_END}))
app.use(express.json())

app.get("/transactions", async (req, res) => {
  try {
    const results = await Model.find();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

app.get("/transactions/:id", async (req, res) => {
  try {
    const result = await Model.findById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});


app.delete("/transactions/:id", async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

app.post("/transactions", async (req, res) => {
  try {
    const trans = new Model(req.body);
    await trans.save();
    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

app.put("/transactions/:id", async (req, res) => {
  try {
    delete req.body._id;
    await Model.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

app.listen(5001, () => {
  console.log("Your app is on this port");
});