const { Board } = require('../models');

async function getAllBoards(req, res) {
  try {
    const boards = await Board.findAll();
    res.json(boards);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllBoards,
};
