const fs = require("fs");
const express = require("express");
const viewsRouters = express.Router();

let products = JSON.parse(
  fs.readFileSync("./database/productos.JSON", "utf-8")
);

viewsRouters.get("/", (req, res) => {
  res.render("home", { products });
});
viewsRouters.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts");
});

module.exports = viewsRouters;
