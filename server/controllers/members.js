const { Member } = require("../models");

const getMembers = async (req, res) => {
  const members = await Member.findAll({
    attributes: ["id", "name", "image", "description"],
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

const updateMember = async (req, res) => {
  const member = await Member.findByPk(req.params.id);

  if (!member) {
    return res.status(404).json({ error: "Member not found." });
  }

  const updatedMemberData = {
    name: req.body.name ? req.body.name : member.name,
    image: req.file ? req.file.location : member.image,
    description: req.body.description
      ? req.body.description
      : member.description,
  };

  await member.set(updatedMemberData);
  const updatedMember = await member.save();

  res.status(200).json(updatedMember);
};

const deleteMember = async (req, res) => {
  const member = await Member.findByPk(req.params.id);

  if (member) {
    await member.destroy();
  }

  res.status(204).end();
};

module.exports = {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
};
