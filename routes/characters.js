const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/characters", async (req, res) => {
  try {
    const { limit, name, skip } = req.query;
    try {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${
          process.env.API_KEY
        }${name ? `&name=${name}` : ""}${limit ? `&limit=${limit}` : ""}${
          skip ? `&skip=${skip}` : ""
        }`
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error.response);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const { characterId } = req.params;
    try {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.API_KEY}`
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error.response);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
