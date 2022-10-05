const newsRouter = require("express").Router();
const { getNews, createNews } = require("../controllers/news");
const {
  newsCreationDataValidator,
  checkValidator,
} = require("../middleware/requestDataValidators");
const JWTValidator = require("../middleware/JWTValidator");
const isAdmin = require("../middleware/isAdmin");
const imageUpload = require("../middleware/imageUpload");

newsRouter.get("/", getNews);

newsRouter.post(
  "/",
  JWTValidator,
  isAdmin,
  imageUpload,
  newsCreationDataValidator,
  checkValidator,
  createNews
);

module.exports = newsRouter;
