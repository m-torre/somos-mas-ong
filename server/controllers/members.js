const { Member } = require("../models");

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
  createMember,
};
