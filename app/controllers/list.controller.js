/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-globals */
const { List, Task } = require('../models');

async function getAllLists(req, res) {
  try {
    const boards = await List.findAll();
    res.json(boards);
  } catch (error) {
    console.log(error);
  }
}

async function getOneList(req, res) {
  const listId = Number(req.params.id);

  if (isNaN(listId)) {
    res
      .status(404)
      .json({ error: 'List not found. Please verify the provided id.' });
    return;
  }

  try {
    const list = await List.findByPk(listId);

    if (!list) {
      res
        .status(404)
        .json({ error: 'List not found. Please verify the provided id.' });
      return;
    }

    res.json(list);
  } catch (error) {
    console.log(error);
  }
}

async function getAllListsOfOneBoard(req, res) {
  const boardId = Number(req.params.id);

  if (isNaN(boardId)) {
    res
      .status(404)
      .send({ error: 'Card not found. Please verify the provided id.' });
    return;
  }

  const listsOfBoardId = await List.findAll({
    where: { board_id: boardId },
    order: [
      ['position', 'ASC'],
      ['created_at', 'ASC'],
    ],
    include: [
      {
        model: Task,
        as: 'tasks',
        include: ['subtasks', 'labels'],
      },
    ],
  });

  res.json(listsOfBoardId);
}

async function createList(req, res) {
  const { name, color, board_id } = req.body;

  if (!name) {
    res
      .status(400)
      .json({ error: "Missing body (or empty) parameter: 'name'." });
    return;
  }

  if (!color) {
    res
      .status(400)
      .json({ error: "Missing body (or empty) parameter: 'color'." });
    return;
  }

  if (!board_id && isNaN(Number(board_id))) {
    res.status(400).json({
      error:
        "Missing body (or empty) parameter: 'board_id'. Or Invalid format.",
    });
    return;
  }

  try {
    const listPosition = (await List.count()) + 1;

    const list = await List.create({
      name,
      position: listPosition,
      color,
      board_id: Number(board_id),
    });

    if (!list) {
      res.status(500).json({ error: 'Database error' });
      return;
    }

    res.status(201).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function updateList(req, res) {
  const listId = Number(req.params.id);

  if (isNaN(listId)) {
    res
      .status(404)
      .send({ error: 'list not found. Please verify the provided id.' });
    return;
  }

  try {
    const list = await List.findByPk(listId);

    if (!list) {
      res
        .status(404)
        .json('Impossible to retreive the list with the provided id');
      return;
    }

    if (req.body.name) {
      list.name = req.body.name;
    }

    if (req.body.position) {
      list.position = req.body.position;
    }

    if (req.body.color) {
      list.color = req.body.color;
    }

    await list.save();

    res.json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function deleteList(req, res) {
  const listId = Number(req.params.id);

  if (isNaN(listId)) {
    res
      .status(404)
      .send({ error: 'list not found. Please verify the provided id.' });
    return;
  }

  try {
    await List.destroy({
      where: {
        id: listId,
      },
    });

    res.status(200).json('list deleted.');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  getAllLists,
  getOneList,
  getAllListsOfOneBoard,
  createList,
  updateList,
  deleteList,
};
