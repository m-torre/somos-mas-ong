const { Organization } = require("../models");

const getOrganization = async (req, res) => {
  const organizationData = await Organization.findByPk(req.params.id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  res.status(200).json(organizationData);
};

const updateOrganization = async (req, res) => {
  const organization = await Organization.findByPk(req.params.id);

  if (!organization) {
    return res.status(404).json({ error: "Organization not found." });
  }

  const updatedOrganizationData = {
    name: req.body.name ? req.body.name : organization.name,
    image: req.file ? req.file.location : organization.image,
    email: req.body.email ? req.body.email : organization.email,
    phone: req.body.phone ? req.body.phone : organization.phone,
    FacebookURL: req.body.FacebookUrl
      ? req.body.FacebookUrl
      : organization.FacebookUrl,
    InstagramURL: req.body.InstagramUrl
      ? req.body.InstagramUrl
      : organization.InstagramUrl,
  };

  await organization.set(updatedOrganizationData);
  const updatedOrganization = await organization.save();

  res.status(200).json(updatedOrganization);
};

module.exports = {
  getOrganization,
  updateOrganization,
};
