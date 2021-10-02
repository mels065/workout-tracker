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

workoutRouter.post('/', async (req, res) => {
    try {
        const workout = await db.Workout.create({});
        res.json(workout);
    } catch (err) {
        res.json({ message: err.message });
    }
});

module.exports = workoutRouter;
