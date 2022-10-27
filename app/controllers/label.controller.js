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
        .send({ error: 'Label not found. Please verify the provided id.' });
      return;
    }

    res.json(label);
  } catch (error) {
    console.log(error);
  }
}

async function createLabel(req, res) {
  const { name, color } = req.body;

  if (!name) {
    res
      .status(400)
      .json({ error: "Missing body (or empty) parameter: 'name'." });
    return;
  }

  if (!color) {
    res.status(400).json({
      error: "Missing body (or empty) parameter: 'color', or invalid format.",
    });
    return;
  }

  try {
    const label = await Label.create({
      name,
      color,
    });

    if (!label) {
      res.status(500).json({ error: 'Database error' });
      return;
    }

    res.status(201).json(label);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function updateLabel(req, res) {
  const labelId = Number(req.params.id);

  if (isNaN(labelId)) {
    res
      .status(404)
      .send({ error: 'label not found. Please verify the provided id.' });
    return;
  }

  try {
    const label = await Label.findByPk(labelId);

    if (!label) {
      res
        .status(404)
        .json('Impossible to retreive the label with the provided id');
      return;
    }

    if (req.body.name) {
      label.name = req.body.name;
    }

    if (req.body.color) {
      label.color = req.body.color;
    }

    await label.save();

    res.json(label);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function deleteLabel(req, res) {
  const labelId = Number(req.params.id);

  if (isNaN(labelId)) {
    res
      .status(404)
      .send({ error: 'label not found. Please verify the provided id.' });
    return;
  }

  try {
    await Label.destroy({
      where: {
        id: labelId,
      },
    });

    res.status(200).json('label deleted.');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  getAllLabels,
  getOneLabel,
  createLabel,
  updateLabel,
  deleteLabel,
};
