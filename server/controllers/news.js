const { News } = require("../models");

const getNews = async (req, res) => {
  const news = await News.findAll();

  res.status(200).json(news);
};

const createNews = async (req, res) => {
  const newsData = {
    name: req.body.name,
    content: req.body.content,
    image: req.file ? req.file.location : null,
  };

  const savedNews = await News.create(newsData);
  res.status(201).json(savedNews);
};

const updateNews = async (req, res) => {
  const news = await News.findByPk(req.params.id);

  if (!news) {
    return res.status(404).json({ error: "News not found." });
  }

  const updatedNewsData = {
    name: req.body.name ? req.body.name : news.name,
    content: req.body.content ? req.body.content : news.content,
    image: req.file ? req.file.location : news.image,
  };

  await news.set(updatedNewsData);
  const updatedNews = await news.save();

  res.status(200).json(updatedNews);
};

const deleteNews = async (req, res) => {
  const news = await News.findByPk(req.params.id);

  if (news) {
    await news.destroy();
  }

  res.status(204).end();
};

module.exports = {
  getNews,
  createNews,
  updateNews,
  deleteNews,
};
