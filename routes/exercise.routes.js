module.exports = (app) => {	
    const exercises = require('../controllers/exercise.controller.js');

    // Retrieve all exercises
    app.get('/exercises', exercises.findAll);

    // Retrieve one exercise
    app.get('/exercises/:exerciseId', exercises.findOne);

    // Create a new exercise
    app.post('/exercises', exercises.create);

    // Update an exercise with exerciseId
    app.put('/exercises/:exerciseId', exercises.update);
    
    // Delete an exercise with exerciseId
    app.delete('/exercises/:exerciseId', exercises.delete);
};