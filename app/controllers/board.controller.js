async function getAllBoards(req, res) {
  res.json({ message: 'Coucou get all boards' });
}

module.exports = {
  getAllBoards,
};
