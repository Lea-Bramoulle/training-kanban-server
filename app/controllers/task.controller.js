/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
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
        .send({ error: 'Task not found. Please verify the provided id.' });
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

async function createTask(req, res) {
  const { name, position, description, list_id } = req.body;

  if (!name) {
    res
      .status(400)
      .json({ error: "Missing body (or empty) parameter: 'name'." });
    return;
  }

  if (!position && isNaN(Number(position))) {
    res
      .status(400)
      .json({ error: "Missing body (or empty) parameter: 'position'." });
    return;
  }

  if (!description) {
    res
      .status(400)
      .json({ error: "Missing body (or empty) parameter: 'description'." });
    return;
  }

  if (!list_id && isNaN(Number(list_id))) {
    res.status(400).json({
      error: "Missing body (or empty) parameter: 'list_id'. Or Invalid format.",
    });
    return;
  }

  try {
    const task = await Task.create({
      name,
      position: Number(position),
      description,
      list_id: Number(list_id),
    });

    if (!task) {
      res.status(500).json({ error: 'Database error' });
      return;
    }

    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function updateTask(req, res) {
  const taskId = Number(req.params.id);

  if (isNaN(taskId)) {
    res
      .status(404)
      .send({ error: 'task not found. Please verify the provided id.' });
    return;
  }

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      res
        .status(404)
        .json('Impossible to retreive the task with the provided id');
      return;
    }

    if (req.body.name) {
      task.name = req.body.name;
    }

    if (req.body.position) {
      task.position = req.body.position;
    }

    if (req.body.description) {
      task.description = req.body.description;
    }

    if (req.body.list_id) {
      task.list_id = req.body.list_id;
    }

    await task.save();

    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function deleteTask(req, res) {
  const taskId = Number(req.params.id);

  if (isNaN(taskId)) {
    res
      .status(404)
      .send({ error: 'task not found. Please verify the provided id.' });
    return;
  }

  try {
    await Task.destroy({
      where: {
        id: taskId,
      },
    });

    res.status(200).json('task deleted.');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  getAllTasks,
  getOneTask,
  getAllTasksOfOneList,
  createTask,
  updateTask,
  deleteTask,
};
