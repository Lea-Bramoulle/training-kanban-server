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

module.exports = {
  getAllSubtasks,
  getOneSubtask,
  getAllSubtasksOfOneTask,
};
