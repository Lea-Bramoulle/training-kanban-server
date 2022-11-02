/* eslint-disable camelcase */
/* eslint-disable no-restricted-globals */
const { Subtask } = require('../models');

async function getAllSubtasks(req, res) {
  try {
    const subtasks = await Subtask.findAll();
    res.json(subtasks);
  } catch (error) {
    console.log(error);
  }
}

async function getOneSubtask(req, res) {
  const subtaskId = Number(req.params.id);

  if (isNaN(subtaskId)) {
    res
      .status(404)
      .send({ error: 'subtask not found. Please verify the provided id.' });
    return;
  }

  try {
    const subtask = await Subtask.findByPk(subtaskId);

    if (!subtask) {
      res
        .status(404)
        .send({ error: 'Card not found. Please verify the provided id.' });
      return;
    }

    res.json(subtask);
  } catch (error) {
    console.log(error);
  }
}

async function getAllSubtasksOfOneTask(req, res) {
  const taskId = Number(req.params.id);

  if (isNaN(taskId)) {
    res
      .status(404)
      .send({ error: 'Card not found. Please verify the provided id.' });
    return;
  }

  try {
    const subtasks = await Subtask.findAll({
      where: {
        task_id: taskId,
      },
    });

    res.json(subtasks);
  } catch (error) {
    console.log(error);
  }
}

async function createSubtask(req, res) {
  const { description, task_id } = req.body;

  if (!description) {
    res
      .status(400)
      .json({ error: "Missing body (or empty) parameter: 'description'." });
    return;
  }

  if (!task_id && isNaN(Number(task_id))) {
    res.status(400).json({
      error: "Missing body (or empty) parameter: 'task_id', or invalid format.",
    });
    return;
  }

  try {
    const subtask = await Subtask.create({
      description,
      is_done: false,
      task_id,
    });

    if (!subtask) {
      res.status(500).json({ error: 'Database error' });
      return;
    }

    res.status(201).json(subtask);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function updateSubtask(req, res) {
  const subtaskId = Number(req.params.id);

  if (isNaN(subtaskId)) {
    res
      .status(404)
      .send({ error: 'subtask not found. Please verify the provided id.' });
    return;
  }

  try {
    const subtask = await Subtask.findByPk(subtaskId);

    if (!subtask) {
      res
        .status(404)
        .json('Impossible to retreive the subtask with the provided id');
      return;
    }

    if (req.body.description) {
      subtask.description = req.body.description;
    }

    subtask.is_done = req.body.is_done;

    await subtask.save();

    res.json(subtask);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function deleteSubtask(req, res) {
  const subtaskId = Number(req.params.id);

  if (isNaN(subtaskId)) {
    res
      .status(404)
      .send({ error: 'subtask not found. Please verify the provided id.' });
    return;
  }

  try {
    await Subtask.destroy({
      where: {
        id: subtaskId,
      },
    });

    res.status(200).json('subtask deleted.');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  getAllSubtasks,
  getOneSubtask,
  getAllSubtasksOfOneTask,
  createSubtask,
  updateSubtask,
  deleteSubtask,
};
