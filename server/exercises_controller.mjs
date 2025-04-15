import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';
import { body, validationResult } from 'express-validator';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}


/**
 * Create a new exercise with the name, reps, weight, unit and date provided in the body
 */
app.post(
    '/exercises', 
    body('reps').isInt({min: 1 }),
    body('weight').isInt({min: 1 }),
    body('unit').isIn(["kgs", "lbs"]),
    
    (req, res) => {
        const date_1 = isDateValid(req.body.date)
        if (date_1 == false) {
            return res.status(400).json({ Error: "Invalid request" });
        }
        const name_1 = req.body.name
        if (name_1 == null | name_1 == "") {
            return res.status(400).json({ Error: "Invalid request" });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ Error: "Invalid request" });
        }
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    .then(exercise => {
        res.status(201).json(exercise);
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Ivalid Request' });
    });
});


/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const ExerciseId = req.params._id;
    exercises.findExerciseById(ExerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });

});
app.get('/exercises', (req, res) => {
    let filter = {};
    exercises.findExercises(filter, '', 0)
        .then(excercise => {
            res.send(excercise);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });

});
/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, unit and date to the values provided in the body.
 */
 app.put(
     '/exercises/:_id',
     body('reps').isInt({min: 1 }),
     body('weight').isInt({min: 1 }),
     body('unit').isIn(["kgs", "lbs"]),
     
     (req, res) => {
         const date_1 = isDateValid(req.body.date)
         if (date_1 == false) {
             return res.status(400).json({ Error: "Invalid request" });
         }
         const name_1 = req.body.name
         if (name_1 == null | name_1 == "") {
             return res.status(400).json({ Error: "Invalid request" });
         }
 
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
             return res.status(400).json({ Error: "Invalid request" });
         }
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
 app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteExercises(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});