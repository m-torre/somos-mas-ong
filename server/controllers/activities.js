const { Activity } = require("../models");

const createActivity = async (req, res) => {
  const activityData = {
    name: req.body.name,
    image: req.file.location,
    content: req.body.content,
  };

  const savedActivity = await Activity.create(activityData);
  res.status(201).json(savedActivity);
};

module.exports = {
  createActivity,
};
