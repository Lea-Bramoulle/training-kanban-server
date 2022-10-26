const Board = require('./Board');
const List = require('./List');
const Task = require('./Task');
const Subtask = require('./SubTask');
const Label = require('./Label');

// Board <-> List

Board.hasMany(List, {
  as: {
    singular: 'list',
    plural: 'lists',
  },
  foreignKey: 'board_id',
});

List.belongsTo(Board, {
  as: {
    singular: 'board',
    plural: 'boards',
  },
  foreignKey: 'board_id',
});

// List <-> Task

List.hasMany(Task, {
  as: 'tasks',
  foreignKey: 'list_id',
});

Task.belongsTo(List, {
  as: {
    singular: 'list',
    plural: 'lists',
  },
  foreignKey: 'list_id',
});

// Task <-> Subtask

Task.hasMany(Subtask, {
  as: 'subtasks',
  foreignKey: 'task_id',
});

Subtask.belongsTo(Task, {
  as: 'task',
  foreignKey: 'task_id',
});

// Task <--> Label

Task.belongsToMany(Label, {
  as: 'labels',
  through: 'task_has_label',
  foreignKey: 'task_id',
  otherKey: 'label_id',
  timestamps: false,
});

Label.belongsToMany(Task, {
  as: 'tasks',
  through: 'task_has_label',
  foreignKey: 'label_id',
  otherKey: 'task_id',
  timestamps: false,
});

module.exports = {
  Board,
  List,
  Task,
  Subtask,
  Label,
};
