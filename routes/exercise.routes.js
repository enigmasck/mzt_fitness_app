module.exports = (app) => {	
    const exercises = require('../controllers/exercise.controller.js');

    // Retrieve all exercises
    app.get('/exercises', exercises.getAllExercises);

    // Retrieve one exercise
    app.get('/exercises/:exerciseId', exercises.getExerciseById);

    // Create a new exercise
    app.post('/exercises', exercises.addExercise);

    // Update an exercise with exerciseId
    app.put('/exercises/:exerciseId', exercises.updateExercise);
    
    // Delete an exercise with exerciseId
    app.delete('/exercises/:exerciseId', exercises.deleteExercise);
};