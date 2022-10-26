/* eslint-disable no-restricted-globals */
const { Label } = require('../models');

async function getAllLabels(req, res) {
  try {
    const labels = await Label.findAll();
    res.json(labels);
  } catch (error) {
    console.log(error);
  }
}

async function getOneLabel(req, res) {
  const labelId = Number(req.params.id);

  if (isNaN(labelId)) {
    res
      .status(404)
      .json({ error: 'label not found. Please verify the provided id.' });
    return;
  }

  try {
    const label = await Label.findByPk(labelId);

    if (!label) {
      res
        .status(404)
        .send({ error: 'Card not found. Please verify the provided id.' });
      return;
    }

    res.json(label);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllLabels,
  getOneLabel,
};
