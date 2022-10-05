const { Member } = require("../models");

const getMembers = async (req, res) => {
  const members = await Member.findAll({
    attributes: ["name", "image", "description"],
  });

  res.status(200).json(members);
};

const createMember = async (req, res) => {
  const memberData = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
  };

  const savedMember = await Member.create(memberData);
  res.status(201).json(savedMember);
};

module.exports = {
  getMembers,
  createMember,
};
