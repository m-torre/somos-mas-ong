const { Organization } = require("../models");

const getOrganization = async (req, res) => {
  const organizationData = await Organization.findByPk(req.params.id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  res.status(200).json(organizationData);
};

module.exports = {
  getOrganization,
};
