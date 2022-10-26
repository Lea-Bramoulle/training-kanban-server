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

module.exports = {
  getAllLists,
  getOneList,
  getAllListsOfOneBoard,
};
