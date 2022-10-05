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

const updateActivity = async (req, res) => {
  const activity = await Activity.findByPk(req.params.id);

  if (!activity) {
    return res.status(404).json({ error: "Activity not found." });
  }

  const updatedActivityData = {
    name: req.body.name ? req.body.name : activity.name,
    image: req.file ? req.file.location : activity.image,
    content: req.body.content ? req.body.content : activity.content,
  };

  await activity.set(updatedActivityData);
  const updatedActivity = await activity.save();

  res.status(200).json(updatedActivity);
};

module.exports = {
  getActivities,
  createActivity,
  updateActivity,
};
