/* eslint-disable no-restricted-globals */
const { Task } = require('../models');

async function getAllTasks(req, res) {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.log(error);
  }
}

async function getOneTask(req, res) {
  const taskId = Number(req.params.id);

  if (isNaN(taskId)) {
    res
      .status(404)
      .send({ error: 'Task not found. Please verify the provided id.' });
    return;
  }

  try {
    const task = await Task.findByPk(taskId, {
      include: ['subtasks', 'labels'],
    });

    if (!task) {
      res
        .status(404)
        .send({ error: 'Card not found. Please verify the provided id.' });
      return;
    }

    res.json(task);
  } catch (error) {
    console.log(error);
  }
}

async function getAllTasksOfOneList(req, res) {
  const listId = Number(req.params.id);

  if (isNaN(listId)) {
    res
      .status(404)
      .send({ error: 'Card not found. Please verify the provided id.' });
    return;
  }

  try {
    const tasks = await Task.findAll({
      where: {
        list_id: listId,
      },
    });

    res.json(tasks);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllTasks,
  getOneTask,
  getAllTasksOfOneList,
};
