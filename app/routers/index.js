const { Router } = require('express');

const boardRouter = require('./board.router');
const listRouter = require('./list.router');
const taskRouter = require('./task.router');
const subTaskRouter = require('./subTask.router');
const labelRouter = require('./label.router');

const mainRouter = new Router();

mainRouter.use(boardRouter);
mainRouter.use(listRouter);
mainRouter.use(taskRouter);
mainRouter.use(subTaskRouter);
mainRouter.use(labelRouter);

module.exports = mainRouter;
