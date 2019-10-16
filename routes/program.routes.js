module.exports = (app) => {	
    const programs = require('../controllers/program.controller.js');

    // Retrieve all programs
    app.get('/programs', programs.findAll);

    // Retrieve one program
    app.get('/programs/:programId', programs.findOne);
    
    // Create a new program
    app.post('/programs', programs.create);
    
    // Update a program with programId
    app.put('/programs/:programId', programs.update);

   // Delete a program with programId
    app.delete('/programs/:programId', programs.delete);
};