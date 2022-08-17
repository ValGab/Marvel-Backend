const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },
  account: {
    username: {
      required: true,
      type: String,
    },
  },
  favoritesCharacters: { type: Array, default: [] },
  favoritesComics: { type: Array, default: [] },
  token: String,
  hash: String,
  salt: String,
});

// Export de ma variable User
module.exports = User;
