const express = require("express");

const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");

// Import du modèle User
const User = require("../models/User");

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

// Route pour créer un nouvel utilisateur en BDD
router.post("/user/signup", async (req, res) => {
  try {
    const { username, email, password } = req.fields;

    if (username && email && password) {
      const userEmail = await User.findOne({ email });
      if (!userEmail) {
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64);
        const token = uid2(16);
        const newUser = new User({
          account: { username },
          email,
          salt,
          hash,
          token,
        });

        await newUser.save();
        // J'envoie une réponse au client
        const response = {
          _id: newUser._id,
          token: newUser.token,
          account: newUser.account,
        };

        res.status(200).json(response);
      } else {
        res.status(409).json({ message: "User already exist" });
      }
    } else {
      res.status(400).json({ message: "Missing parameters" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour se connecter
router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.fields;

    const userToFind = await User.findOne({ email });

    if (userToFind) {
      const newHash = SHA256(password + userToFind.salt).toString(encBase64);

      if (newHash === userToFind.hash) {
        // J'envoie une réponse au client
        const response = {
          _id: userToFind._id,
          token: userToFind.token,
          account: { username: userToFind.account.username }, // ou account:newUser.account,
          favoritesCharacters: userToFind.favoritesCharacters,
          favoritesComics: userToFind.favoritesCharacters,
        };
        res.status(200).json(response);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour obtenir les favoris de l'user
router.get("/user/favorites", isAuthenticated, async (req, res) => {
  try {
    const favoritesCharacters = req.user.favoritesCharacters;
    const favoritesComics = req.user.favoritesComics;
    const userId = req.user._id;
    res.status(200).json({ userId, favoritesCharacters, favoritesComics });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour ajouter un personnage aux favoris de l'user
router.post(
  "/user/favoritesCharacter/create",
  isAuthenticated,
  async (req, res) => {
    const { id, urlPic, name } = req.fields;
    // id = id du personnage, urlPic = image du personnage, name = nom du personnage
    try {
      const result = { id, urlPic, name };
      const userToModify = req.user;

      if (!userToModify.favoritesCharacters) {
        userToModify.favoritesCharacters.push(result);
        await userToModify.save();
        const newFavChar = userToModify.favoritesCharacters;
        res
          .status(200)
          .json({ message: "Personnage ajouté aux favoris", newFavChar });
      } else {
        let isPresent = false;
        for (let i = 0; i < userToModify.favoritesCharacters.length; i++) {
          if (id === userToModify.favoritesCharacters[i].id) {
            isPresent = true;
          }
        }
        if (!isPresent) {
          userToModify.favoritesCharacters.push(result);
          await userToModify.save();
          const newFavChar = userToModify.favoritesCharacters;
          res
            .status(200)
            .json({ message: "Personnage ajouté aux favoris", newFavChar });
        } else {
          res.status(409).json({ message: "Personnage déjà ajouté" });
        }
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Route pour supprimer un personnage des favoris de l'user
router.post(
  "/user/favoritesCharacter/delete",
  isAuthenticated,
  async (req, res) => {
    const { id } = req.fields;
    // id = id du personnage
    try {
      const userToModify = req.user;

      if (!userToModify.favoritesCharacters) {
        res.status(409).json({ message: "Il n'y a aucun personnage" });
      } else {
        let isPresent = false;
        let characterToDelete = null;
        for (let i = 0; i < userToModify.favoritesCharacters.length; i++) {
          if (id === userToModify.favoritesCharacters[i].id) {
            isPresent = true;
            characterToDelete = i;
          }
        }
        if (isPresent) {
          userToModify.favoritesCharacters.splice(characterToDelete, 1);
          await userToModify.save();
          const newFavChar = userToModify.favoritesCharacters;

          res
            .status(200)
            .json({ message: "Personnage supprimé des favoris", newFavChar });
        } else {
          res
            .status(409)
            .json({ message: "Ce personnage n'est pas dans les favoris" });
        }
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Route pour ajouter un comics aux favoris de l'user
router.post(
  "/user/favoritesComics/create",
  isAuthenticated,
  async (req, res) => {
    const { id, urlPic, title, description } = req.fields;
    // id = id du comics, urlPic = image du comics, title = nom du comics, description du comics
    try {
      const result = { id, urlPic, title, description };
      const userToModify = req.user;

      if (!userToModify.favoritesComics) {
        userToModify.favoritesComics.push(result);
        await userToModify.save();
        const newFavCom = userToModify.favoritesComics;

        res
          .status(200)
          .json({ message: "Comics ajouté aux favoris", newFavCom });
      } else {
        let isPresent = false;
        for (let i = 0; i < userToModify.favoritesComics.length; i++) {
          if (id === userToModify.favoritesComics[i].id) {
            isPresent = true;
          }
        }
        if (!isPresent) {
          userToModify.favoritesComics.push(result);
          await userToModify.save();
          const newFavCom = userToModify.favoritesComics;

          res
            .status(200)
            .json({ message: "Comics ajouté aux favoris", newFavCom });
        } else {
          res.status(409).json({ message: "Comics déjà ajouté aux favoris" });
        }
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Route pour supprimer un comics des favoris de l'user
router.post(
  "/user/favoritesComics/delete",
  isAuthenticated,
  async (req, res) => {
    const { id } = req.fields;
    // id = id du comics
    try {
      const userToModify = req.user;

      if (!userToModify.favoritesComics) {
        res.status(200).json({ message: "Il n'y a aucun comics" });
      } else {
        let isPresent = false;
        let comicsToDelete = null;
        for (let i = 0; i < userToModify.favoritesComics.length; i++) {
          if (id === userToModify.favoritesComics[i].id) {
            isPresent = true;
            comicsToDelete = i;
          }
        }
        if (isPresent) {
          userToModify.favoritesComics.splice(comicsToDelete, 1);
          await userToModify.save();
          const newFavCom = userToModify.favoritesComics;

          res
            .status(200)
            .json({ message: "Comics supprimé des favoris", newFavCom });
        } else {
          res
            .status(401)
            .json({ message: "Ce comics n'est pas dans les favoris" });
        }
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = router;
