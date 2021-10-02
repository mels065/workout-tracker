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

workoutRouter.put('/:id', async (req, res) => {
    try {
        const { id: _id } = req.params;
        const workout = await db.Workout.updateOne(
            {
                _id
            },
            {
                $push: {
                    exercises: req.body
            }
        })
        res.json(workout);
    } catch (err) {
        res.json({ message: err.message });
    }
});

workoutRouter.get('/range', async (req, res) => {
    try {
        const workouts = await db.Workout.aggregate([
            {
                $match: {
                    day: { $gte: new Date(new Date().setDate(new Date().getDate() - 8)) }
                }
            },
            // {
            //     $unwind: "$exercises"
            // },
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration"
                    }
                }
            }
        ]);
        res.json(workouts);
    } catch (err) {
        res.json({ message: err.message });
    }
});

module.exports = workoutRouter;
