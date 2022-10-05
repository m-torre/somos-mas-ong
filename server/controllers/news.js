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

module.exports = {
  getNews,
  createNews,
};
