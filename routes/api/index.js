const apiRouter = require('express').Router();

const workoutRouter = require('./workout-routes');

apiRouter.use('/workouts', workoutRouter);

module.exports = apiRouter;
