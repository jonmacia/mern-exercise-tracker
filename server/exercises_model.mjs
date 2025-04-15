import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercises = mongoose.model("Exercise", exerciseSchema);

/**
 * Create an exercise
 * @param {String} name 
 * @param {Number} reps 
 * @param {Number} weight 
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
 const createExercise = async (name, reps, weight, unit, date) => {
    
    const exercises = new Exercises({ name: name, reps: reps, weight: weight, unit: unit , date: date});
    // Call save to persist this object as a document in MongoDB
    return exercises.save();
}

/**
 * Retrive exercises based on the filter, projection and limit parameters
 * @param {Object} filter 
 * @param {String} projection 
 * @param {Number} limit 
 * @returns 
 */
 const findExercises = async (filter, projection, limit) => {
    const query = Exercises.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
 * Find the exercise with the given ID value
 * @param {String} _id
 * @returns
 */

const findExerciseById = async (_id) => {
    const query = Exercises.findById(_id);
    return query.exec();
}

/**
 * Replace the name, reps, weight, unit and date properties of the exercise with the id value provided
 * @param {String} _id 
 * @param {String} name 
 * @param {Number} reps 
 * @param {Number} weight 
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the number of documents modified
 */
 const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercises.replaceOne({ _id: _id },
        {  name: name, reps: reps, weight: weight, unit: unit , date: date });
    return result.modifiedCount;
}

/**
 * Delete the user based on filter
 * @param {string} _id 
 * @returns A promise. Resolves to the count of deleted documents
 */
 const deleteExercises = async (_id) => {
    const result = await Exercises.deleteMany({_id: _id});
    // Return the count of deleted document(s)
    return result.deletedCount;
}

export { createExercise, findExercises, findExerciseById, replaceExercise, deleteExercises };

