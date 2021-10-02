const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExerciseSchema = new Schema({
    type: {
        type: String,
        enum: ["resistance", "cardio"],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    // resistance properties
    weight: Number,
    reps: Number,
    sets: Number,
    // cardio properties
    distance: Number
});
ExerciseSchema.pre('validate', next => {
    if (this.type === 'resistance') {
        if (!this.weight) {
            next(new Error(`Must include weight for resistance exercise ${this.name}`));
        } else if (!this.reps) {
            next(new Error(`Must include number of reps with resistance exericse ${this.name}`));
        } else if (!this.sets) {
            next(new Error(`Must include number of sets with resistance exercise ${this.name}`));
        } else {
            next();
        }
    } else if (this.type === 'cardio') {
        if (!this.distance) {
            next(new Error(`Must include distance with cardio exercise ${this.name}`));
        } else {
             next();
        }
    }
});

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: ExerciseSchema,
            default: []
        }
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
