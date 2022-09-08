async function getAllTasks(req, res) {
  res.json({ message: "Coucou get all Tasks" });
}

module.exports = {
  getAllTasks,
};
