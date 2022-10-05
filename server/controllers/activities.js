const { Activity } = require("../models");

const getActivities = async (req, res) => {
  const activities = await Activity.findAll({
    attributes: ["id", "name", "image", "content"],
  });

  res.status(200).json(activities);
};

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
  getActivities,
  createActivity,
};
