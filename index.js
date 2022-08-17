const express = require("express");
const formidable = require("express-formidable");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(formidable());

// Import du fichier charcaters.js
const charcatersRoutes = require("./routes/characters");
// Je demande à mon serveur d'utiliser les routes présentes dans ce fichier
app.use(charcatersRoutes);

// Import du fichier comics.js
const comicsRoutes = require("./routes/comics");
// Je demande à mon serveur d'utiliser les routes présentes dans ce fichier
app.use(comicsRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route introuvable" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
