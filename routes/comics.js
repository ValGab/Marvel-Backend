const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/comics", async (req, res) => {
  try {
    const { limit, title, skip } = req.query;
    try {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${
          process.env.API_KEY
        }${title ? `&title=${title}` : ""}${limit ? `&limit=${limit}` : ""}${
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

router.get("/comics/:characterId", async (req, res) => {
  try {
    const { characterId } = req.params;
    try {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.API_KEY}`
      );
    } catch (error) {
      console.log(error.response);
    }
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
