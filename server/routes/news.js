const newsRouter = require("express").Router();
const {
  getNews,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/news");
const {
  idValidator,
  newsCreationDataValidator,
  newsUpdateDataValidator,
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

newsRouter.put(
  "/:id",
  JWTValidator,
  isAdmin,
  idValidator,
  checkValidator,
  imageUpload,
  newsUpdateDataValidator,
  checkValidator,
  updateNews
);

newsRouter.delete(
  "/:id",
  JWTValidator,
  isAdmin,
  idValidator,
  checkValidator,
  deleteNews
);

module.exports = newsRouter;
