const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "Unkown endpoint" });
};

module.exports = unknownEndpoint;
