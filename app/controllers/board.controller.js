/* eslint-disable no-restricted-globals */
const { Board } = require('../models');

async function getAllBoards(req, res) {
  try {
    const boards = await Board.findAll();
    res.json(boards);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
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
        .send({ error: 'Board not found. Please verify the provided id.' });
      return;
    }

    res.json(board);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function createBoard(req, res) {
  const boardName = req.body.name;

  if (!boardName) {
    res
      .status(400)
      .json({ error: "Missing body (or empty) parameter: 'name'." });
    return;
  }

  try {
    const board = await Board.create({
      name: boardName,
    });

    if (!board) {
      res.status(500).json({ error: 'Database error' });
      return;
    }

    res.status(201).json(board);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function updateBoard(req, res) {
  const boardId = Number(req.params.id);

  if (isNaN(boardId)) {
    res
      .status(404)
      .send({ error: 'Board not found. Please verify the provided id.' });
    return;
  }

  try {
    const board = await Board.findByPk(boardId);

    if (!board) {
      res
        .status(404)
        .json('Impossible to retreive the board with the provided id');
      return;
    }

    if (req.body.name) {
      board.name = req.body.name;
    }

    await board.save();

    res.json(board);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function deleteBoard(req, res) {
  const boardId = Number(req.params.id);

  if (isNaN(boardId)) {
    res
      .status(404)
      .send({ error: 'Board not found. Please verify the provided id.' });
    return;
  }

  try {
    await Board.destroy({
      where: {
        id: boardId,
      },
    });

    res.status(200).json('Board deleted.');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  getAllBoards,
  getOneBoard,
  createBoard,
  updateBoard,
  deleteBoard,
};
