const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(formidable());

mongoose.connect(process.env.MONGODB_URI);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the universe" });
});

// Import du fichier user.js
const userRoutes = require("./routes/user");
app.use(userRoutes);

// Import du fichier characters.js
const charcatersRoutes = require("./routes/characters");
app.use(charcatersRoutes);

// Import du fichier comics.js
const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route introuvable" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
