const { List, Task } = require('../models');

async function getAllLists(req, res) {
  try {
    const boards = await List.findAll({
      order: [
        ['position', 'ASC'],
        ['created_at', 'ASC'],
      ],
    });
    res.json(boards);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllLists,
};
