const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet"); //aide à protéger les en-têtes HTTP.
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");
const path = require("path");
const dotenv = require("dotenv").config(); // pour caché les donnés

mongoose.connect(process.env.DB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
})
          .then(() => console.log("Connexion à MongoDB réussie !"))
          .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();
app.use((req, res, next) => {
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader(
                    "Access-Control-Allow-Headers",
                    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
          );
          res.setHeader(
                    "Access-Control-Allow-Methods",
                    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
          );
          next();
});

app.use(bodyParser.json());
app.use(helmet());
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
