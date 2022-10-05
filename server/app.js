const express = require("express");
const app = express();

require("express-async-errors");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const unknownEndpoint = require("./middleware/unknownEndpoint");

const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const organizationsRouter = require("./routes/organizations");
const membersRouter = require("./routes/members");

app.use(cors());
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/organizations", organizationsRouter);
app.use("/api/members", membersRouter);

app.get("/api/*", unknownEndpoint);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = app;
