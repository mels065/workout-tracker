const workoutRouter = require('express').Router();

const db = require('../../models');

workoutRouter.get('/', async (req, res) => {
    try {
        const lastWorkout = await db.Workout.findOne().sort({
            day: -1
        });
        res.json(lastWorkout);
    } catch (err) {
        res.json({ message: err.message });
    }
});

module.exports = workoutRouter;
