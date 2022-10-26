/* eslint-disable no-restricted-globals */
const { Board } = require('../models');

async function getAllBoards(req, res) {
  try {
    const boards = await Board.findAll();
    res.json(boards);
  } catch (error) {
    console.log(error);
  }
}

async function getOneBoard(req, res) {
  const boardId = Number(req.params.id);

  if (isNaN(boardId)) {
    res
      .status(404)
      .json({ error: 'Board not found. Please verify the provided id.' });
    return;
  }

  try {
    const board = await Board.findByPk(boardId);

    if (!board) {
      res
        .status(404)
        .send({ error: 'Card not found. Please verify the provided id.' });
      return;
    }

    res.json(board);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllBoards,
  getOneBoard,
};
