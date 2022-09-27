const express = require("express");
const app = express();

const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const unknownEndpoint = require("./middleware/unknownEndpoint");

app.use(cors());
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/*", unknownEndpoint);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = app;
